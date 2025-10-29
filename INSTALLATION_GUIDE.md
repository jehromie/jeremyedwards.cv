# Installation and Setup Guide

## 📦 Packages Installed

All required npm packages have been successfully installed:

### AI & Machine Learning
- **`ai`** (^3.0.0) - Vercel AI SDK for streaming responses
- **`@ai-sdk/openai`** (^0.0.66) - OpenAI provider for AI SDK
- **`openai`** (^4.20.0) - Official OpenAI API client

### LangChain Integration
- **`@langchain/openai`** (^0.0.28) - OpenAI integration for LangChain
- **`@langchain/core`** (^0.1.17) - Core LangChain functionality
- **`@langchain/community`** (^0.0.53) - Community LangChain components
- **`langchain`** (^0.1.25) - Main LangChain library

### Database
- **`mongodb`** (^5.9.0) - MongoDB driver for Node.js

### Framework & Development
- **`next`** (^14.0.0) - Next.js framework for API routes
- **`react`** & **`react-dom`** (^18.2.0) - React for potential UI components
- **`typescript`** (^5.3.0) - TypeScript support
- **`@types/node`** (^20.10.0) - Node.js type definitions

## 🚀 Setup Instructions

### 1. Environment Configuration

Copy the environment template:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your API keys:
```env
# Required for AI functionality
OPENAI_API_KEY=your_openai_api_key_here

# Optional - for vector search (system falls back to basic search if not provided)
MONGODB_ATLAS_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority

NODE_ENV=development
```

### 2. Available Scripts

The package.json now includes multiple run options:

```bash
# Express server (original setup)
npm run dev          # Development with nodemon
npm start           # Production server

# Next.js server (for API routes)
npm run next-dev    # Next.js development server
npm run build       # Build Next.js application
npm run next-start  # Start built Next.js application
```

### 3. API Endpoint

The integrated chat API is available at:
- **Express mode**: `http://localhost:3000/app/chat` (if Express routing is configured)
- **Next.js mode**: `http://localhost:3000/api/chat` (using Next.js API routes)

## 🔧 Configuration Files Created

### `next.config.js`
Next.js configuration with:
- App directory support
- Environment variable passing
- API route configuration

### `tsconfig.json`
TypeScript configuration with:
- Modern ES features
- Next.js plugin support
- Path aliases (`@/*` → `./`)
- Proper module resolution

### `app/lib/mongodb.ts`
MongoDB connection manager with:
- Connection pooling
- Development/production environment handling
- Graceful error handling
- Global connection caching

## 🎯 Features Now Available

### Vector Search Capabilities
- **Full MongoDB Atlas integration** with vector search
- **OpenAI embeddings** for semantic search
- **Query correction** using GPT-4 for better results
- **Fallback to basic search** if database unavailable

### AI Chat Integration
- **Streaming responses** using Vercel AI SDK
- **Multiple response modes**: 
  - `search-find`: Concise answers (GPT-3.5-turbo)
  - `find-summarise`: Detailed analysis (GPT-4)
- **Jeremy Edwards persona** for interview responses
- **Context-aware** responses based on CV data

### Robust Error Handling
- **Graceful fallbacks** when services unavailable
- **Comprehensive logging** for debugging
- **Multiple search strategies** for reliability

## 🗂️ Project Structure

```
📁 /workspaces/jeremyedwards.cv/
├── 📁 app/
│   ├── 📁 chat/
│   │   └── 📄 route.ts          # Integrated chat API
│   └── 📁 lib/
│       └── 📄 mongodb.ts        # Database connection
├── 📁 public/                   # Static files (CV website)
├── 📄 server.js                 # Express server (original)
├── 📄 package.json              # Updated with all dependencies
├── 📄 next.config.js            # Next.js configuration
├── 📄 tsconfig.json             # TypeScript configuration
└── 📄 .env.local.example        # Environment template
```

## 🚦 Getting Started

1. **Set up environment variables** (see step 1 above)

2. **Choose your server mode**:

   **Option A: Next.js API Routes (Recommended)**
   ```bash
   npm run next-dev
   ```
   Access chat at: `http://localhost:3000/api/chat`

   **Option B: Express Server**
   ```bash
   npm run dev
   ```
   Configure routing to serve API at: `http://localhost:3000/app/chat`

3. **Test the chat API**:
   ```bash
   curl -X POST http://localhost:3000/api/chat \
     -H "Content-Type: application/json" \
     -d '{
       "messages": [{"role": "user", "content": "Tell me about your product management experience"}],
       "actionType": "search-find"
     }'
   ```

## 🔍 Troubleshooting

### If MongoDB connection fails:
- System automatically falls back to basic search
- Check your `MONGODB_ATLAS_URI` in `.env.local`
- Ensure your IP is whitelisted in MongoDB Atlas

### If OpenAI API fails:
- Verify `OPENAI_API_KEY` in `.env.local`
- Check your OpenAI account billing status
- Review API rate limits

### If packages conflict:
- The installation used `--legacy-peer-deps` to resolve conflicts
- All major functionality should work despite warnings

## 📈 Next Steps

The system is now ready for:
1. **Frontend integration** with the CV website
2. **Vector database setup** for enhanced search
3. **Custom embedding models** for domain-specific knowledge
4. **Conversation memory** and context persistence
5. **Analytics and monitoring** integration

All dependencies are installed and the integrated chat system is ready to use! 🎉