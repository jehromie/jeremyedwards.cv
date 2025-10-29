import { promises as fsp } from "fs";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "@langchain/openai";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: '.env.local' });

async function createEmbeddings() {
  let client;
  
  try {
    console.log("🚀 Starting embedding creation process...");
    
    // Check environment variables
    const mongoUri = process.env.MONGODB_ATLAS_URI;
    const openaiKey = process.env.OPENAI_API_KEY;
    
    if (!mongoUri || mongoUri === 'your_mongodb_uri_here') {
      throw new Error("❌ MONGODB_ATLAS_URI environment variable is not set");
    }
    
    if (!openaiKey || openaiKey === 'your_openai_api_key_here') {
      throw new Error("❌ OPENAI_API_KEY environment variable is not set");
    }
    
    console.log("✅ Environment variables loaded");
    
    // Connect to MongoDB
    client = new MongoClient(mongoUri);
    await client.connect();
    console.log("✅ Connected to MongoDB Atlas");
    
    const db = client.db("interview_app");
    const collection = db.collection("about_jeremy");
    
    // Clear existing documents
    const deleteResult = await collection.deleteMany({});
    console.log(`🗑️  Cleared ${deleteResult.deletedCount} existing documents`);
    
    // Initialize embeddings
    const embeddings = new OpenAIEmbeddings({
      openAIApiKey: openaiKey,
      modelName: "text-embedding-ada-002",
    });
    
    // Read and process documents
    const docs_dir = "assets/embedDocs";
    const fileNames = await fsp.readdir(docs_dir);
    console.log(`📁 Found ${fileNames.length} files in ${docs_dir}:`, fileNames);
    
    let totalChunks = 0;
    
    for (const fileName of fileNames) {
      try {
        console.log(`📄 Processing ${fileName}...`);
        
        const document = await fsp.readFile(`${docs_dir}/${fileName}`, "utf8");
        console.log(`📝 Read ${document.length} characters from ${fileName}`);
        
        // Split document into chunks
        const splitter = RecursiveCharacterTextSplitter.fromLanguage("markdown", {
          chunkSize: 500,
          chunkOverlap: 50,
        });
        
        const chunks = await splitter.createDocuments([document]);
        console.log(`✂️  Split into ${chunks.length} chunks`);
        
        // Create embeddings for each chunk
        for (let i = 0; i < chunks.length; i++) {
          const chunk = chunks[i];
          console.log(`🔄 Creating embedding for chunk ${i + 1}/${chunks.length}...`);
          
          // Generate embedding
          const embedding = await embeddings.embedQuery(chunk.pageContent);
          
          // Prepare document for insertion
          const doc = {
            text: chunk.pageContent,
            embeddings: embedding,
            metadata: {
              source: fileName,
              chunkIndex: i,
              totalChunks: chunks.length,
              timestamp: new Date()
            }
          };
          
          // Insert into MongoDB
          await collection.insertOne(doc);
          totalChunks++;
        }
        
        console.log(`✅ Successfully processed ${fileName} (${chunks.length} chunks)`);
        
      } catch (fileError) {
        console.error(`❌ Error processing ${fileName}:`, fileError.message);
      }
    }
    
    console.log(`🎉 Done: Created embeddings for ${totalChunks} chunks`);
    
    // Verify the documents were inserted
    const count = await collection.countDocuments();
    console.log(`📊 Total documents in collection: ${count}`);
    
    // Show a sample document structure
    const sample = await collection.findOne();
    if (sample) {
      console.log("📄 Sample document structure:");
      console.log("- Text field length:", sample.text?.length || 0);
      console.log("- Embeddings length:", sample.embeddings?.length || 0);
      console.log("- Source:", sample.metadata?.source);
    }
    
  } catch (error) {
    console.error("❌ Embedding creation failed:", error.message);
    throw error;
  } finally {
    if (client) {
      await client.close();
      console.log("🔒 Database connection closed");
    }
  }
}

// Run the embedding creation
createEmbeddings().catch(console.error);