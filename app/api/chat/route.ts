import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { OpenAIEmbeddings } from "@langchain/openai";
import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import mongoClientPromise from '../../lib/mongodb';

// export const runtime = 'edge';

// Function to use OpenAI to correct and expand unclear queries
async function correctQueryWithOpenAI(query: string): Promise<string> {
  const chatModel = new ChatOpenAI({
    modelName: "gpt-3.5-turbo",
    temperature: 0.5,
    maxTokens: 100,
  });

  try {
    const messages = [
      new SystemMessage(`You are an interview assistant helping the interviewer ask interview questions about Jeremy Edwards. 
Your job is to:
1. Interpret each interview question clearly.
2. Generate a professional, personalised answer based on Jeremy's CV, experience and personal background.
3. Highlight achievements, leadership examples, and product delivery outcomes.
4. Adapt tone for conversational interview responses (not resume bullets).

Use the following context as the candidate's CV and prior responses. 
When asked a question, return only the best answer.`),
      new HumanMessage(`Question: "${query}"`)
    ];

    const response = await chatModel.invoke(messages);
    const correctedQuery = typeof response.content === 'string' 
      ? response.content.trim() 
      : String(response.content).trim();
    console.log(`OpenAI corrected "${query}" → "${correctedQuery}"`);
    return correctedQuery;
  } catch (error) {
    console.error("OpenAI correction failed:", error);
    return query; // Fallback to original query
  }
}

// Comprehensive vector search function
async function performVectorSearch(query: string, actionType: string = 'search-find') {
  try {
    // Validate input
    if (!query || typeof query !== 'string') {
      console.log('Invalid query provided to vector search');
      return [];
    }

    const client = await mongoClientPromise;
    const dbName = "interview_app";
    const collectionName = "about_jeremy";
    const collection = client.db(dbName).collection(collectionName);
    
    console.log(`Vector search query: "${query}"`);
    console.log(`Action type: "${actionType}"`);
    
    // Check if this is a specific employee ID query
    const empIdMatch = query.match(/EMP-\d{4}/i);
    let finalResults: any[] = [];
    
    if (empIdMatch) {
      console.log(`Detected employee ID query: ${empIdMatch[0]}`);
      
      // First try exact text search for employee ID
      const exactResults = await collection.find({
        text: { $regex: new RegExp(empIdMatch[0], 'i') }
      }).toArray();
      
      if (exactResults.length > 0) {
        console.log(`Found ${exactResults.length} exact matches for ${empIdMatch[0]}`);
        finalResults = exactResults.map((doc: any) => ({
          pageContent: doc.text,
          metadata: { score: 0.99 } // High confidence for exact matches
        }));
      }
    }
    
    // If no exact matches found, or not an employee ID query, use vector search
    if (finalResults.length === 0) {
      console.log('Attempting vector search...');
      try {
        // Create embeddings for the query
        const embeddings = new OpenAIEmbeddings({
          modelName: 'text-embedding-ada-002',
          stripNewLines: true,
        });

        // Try initial search with original query
        const initialQueryEmbedding = await embeddings.embedQuery(query);
        const initialPipeline = [
          {
            $vectorSearch: {
              index: "interview_app",
              path: "embeddings",
              queryVector: initialQueryEmbedding,
              numCandidates: 100,
              limit: 5
            }
          },
          {
            $project: {
              text: 1,
              score: { $meta: "vectorSearchScore" }
            }
          }
        ];

        const initialResults = await collection.aggregate(initialPipeline).toArray();
        console.log(`Vector search found ${initialResults.length} results`);
        if (initialResults.length > 0) {
          console.log(`Top vector search score: ${initialResults[0].score.toFixed(3)}`);
          finalResults = initialResults.map((doc: any) => ({
            pageContent: doc.text,
            metadata: { score: doc.score }
          }));
        } else {
          console.log('Vector search returned no results');
        }
      } catch (vectorError) {
        console.log('Vector search failed:', vectorError);
        console.log('This is expected if no vector search index exists in MongoDB Atlas');
      }
    }
    
    return finalResults;
  } catch (error) {
    console.error("Vector search error:", error);
    return []; // Return empty results if vector search fails
  }
}



export async function POST(req: Request) {
  try {
    const body = await req.json();
    const currentMessageContent = body.message || body.prompt || (body.messages && body.messages[body.messages.length - 1].content);
    const actionType = body.actionType || body.mode || 'search-find'; // Default to search and find

    console.log(`Action type: ${actionType}`);
    console.log(`Query: ${currentMessageContent}`);

    // Validate that we have a message
    if (!currentMessageContent || typeof currentMessageContent !== 'string') {
      return new Response(JSON.stringify({ error: "No valid message provided" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Perform vector search
    let vectorSearch: any[] = [];
    try {
      // Check if MongoDB URI is configured
      if (!process.env.MONGODB_ATLAS_URI || process.env.MONGODB_ATLAS_URI === 'your_mongodb_uri_here') {
        console.log("MongoDB URI not configured");
        return new Response(JSON.stringify({ error: "MongoDB not configured" }), {
          status: 500,
          headers: { "Content-Type": "application/json" },
        });
      } else {
        vectorSearch = await performVectorSearch(currentMessageContent, actionType);
        
        // If vector search returns no results, return error
        if (vectorSearch.length === 0) {
          console.log("Vector search returned no results");
          return new Response(JSON.stringify({ error: "No relevant information found" }), {
            status: 404,
            headers: { "Content-Type": "application/json" },
          });
        }
      }
    } catch (error) {
      console.error("Search error:", error);
      return new Response(JSON.stringify({ error: "Search failed" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    console.log(`Search for "${currentMessageContent}" found ${vectorSearch.length} results`);
    if (vectorSearch.length > 0) {
      console.log(`Top result score: ${vectorSearch[0].metadata?.score}`);
    }

    // Define different templates and models based on action type
    let TEMPLATE = '';
    let modelName = '';
    let temperature = 0.00;

    if (actionType === 'search-find') {
      // Search & Find: Exact, concise information with GPT-3.5
      modelName = 'gpt-4o';
      temperature = 0.00;
      TEMPLATE = `You are Jeremy Edwards, responding to interview questions about your CV and professional experience.

IMPORTANT RESPONSE GUIDELINES:
1. Answer in first person as Jeremy Edwards
2. Be conversational but professional
3. Provide specific examples and achievements
4. Keep responses concise and focused
5. Highlight relevant experience for the question asked
6. Use the context provided from your CV

FORMATTING:
- Use bullet points for lists of achievements or skills
- Mention specific companies, technologies, and outcomes
- Include timeframes and quantifiable results where relevant
- Be confident but not boastful

Context from CV:
${JSON.stringify(vectorSearch)}

Interview Question: ${currentMessageContent}

Respond as Jeremy Edwards would in an interview setting.`;

    } else if (actionType === 'find-summarise') {
      // Find & Summarise: Expanded analysis with GPT-4
      modelName = 'gpt-4-turbo';
      temperature = 0.1;
      TEMPLATE = `You are Jeremy Edwards providing a comprehensive response to an interview question about your professional background.

RESPONSE GUIDELINES:
1. Answer in first person as Jeremy Edwards
2. Provide detailed analysis and context
3. Share specific examples and case studies from your experience
4. Explain your thought process and approach to challenges
5. Connect past experiences to potential future contributions
6. Demonstrate deep understanding of your field

FORMATTING:
- Structure response with clear sections if appropriate
- Use specific metrics, timelines, and outcomes
- Reference multiple roles and experiences where relevant
- Show progression and growth in your career
- Include lessons learned and insights gained

Context from CV:
${JSON.stringify(vectorSearch)}

Interview Question: ${currentMessageContent}

Provide a thoughtful, detailed response as Jeremy Edwards would in an interview.`;

    } else {
      // Default to search-find behavior
      modelName = 'gpt-4-turbo';
      temperature = 0.05;
      TEMPLATE = `You are Jeremy Edwards answering questions about your professional experience and CV.

Context from CV:
${JSON.stringify(vectorSearch)}

Question: ${currentMessageContent}

Respond professionally as Jeremy Edwards.`;
    }

    // Create messages array if it doesn't exist
    const messages = body.messages || [{ role: 'user', content: currentMessageContent }];
    messages[messages.length - 1].content = TEMPLATE;

    const result = await streamText({
      model: openai(modelName),
      messages: messages,
      temperature: temperature,
      maxTokens: 100,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
