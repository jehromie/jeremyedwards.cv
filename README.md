# Jeremy Edwards CV

A Node.js web server for hosting Jeremy Edwards' CV website with integrated AI chat functionality.

## 🚀 Features

- **Interactive CV Website** - Professional CV hosted on Express.js
- **AI Chat Integration** - GPT-powered chat for interview questions
- **Vector Search** - MongoDB Atlas + LangChain for contextual responses
- **Dual Modes** - Concise answers or detailed analysis
- **Fallback System** - Works with or without database connection

## ⚡ Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment:**
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your API keys
   ```

3. **Start development server:**
   ```bash
   npm run next-dev    # Next.js with API routes
   # OR
   npm run dev         # Express.js server
   ```

## 🛠️ Tech Stack

### Backend & AI
- **Express.js** - Web server
- **Next.js** - API routes and framework
- **OpenAI GPT** - Language models (GPT-3.5/GPT-4)
- **LangChain** - AI orchestration and embeddings
- **MongoDB Atlas** - Vector search database
- **Vercel AI SDK** - Streaming responses

### Frontend
- **HTML/CSS/JavaScript** - Interactive CV interface
- **Responsive Design** - Mobile-friendly layout
- **Print Optimization** - Clean PDF generation

## 📡 API Endpoints

### Chat API: `POST /api/chat`

**Request Body:**
```json
{
  "messages": [
    {"role": "user", "content": "Tell me about your experience with AI"}
  ],
  "actionType": "search-find"  // or "find-summarise"
}
```

**Action Types:**
- `search-find`: Quick, concise answers using GPT-3.5-turbo
- `find-summarise`: Detailed analysis using GPT-4

**Response:** Streaming text as Jeremy Edwards would respond in an interview

## 🎯 Chat Capabilities

The AI chat system provides:

- **First-person responses** as Jeremy Edwards
- **CV-contextual answers** based on real experience
- **Interview-style conversation** for natural interaction
- **Technical depth** when needed for complex questions
- **Automatic fallback** if vector search unavailable

Example interactions:
- "Tell me about your product management experience"
- "What's your biggest career achievement?"
- "How do you approach agile delivery?"
- "What technologies have you worked with?"

## Available Scripts

- `npm run dev` - Starts the development server with auto-reload using nodemon
- `npm start` - Starts the production server

## Server Details

- **Port:** 3000 (configurable via PORT environment variable)
- **Static files:** Served from `public/` directory
- **Main page:** `public/index.html`
- **API endpoint:** `/api/health` for health checks

## Project Structure

```
├── server.js           # Main Express server file
├── package.json        # Node.js dependencies and scripts
├── public/             # Static files directory
│   └── index.html      # Main HTML page
└── README.md          # This file
```

## Development

The server automatically serves static files from the `public/` directory. You can:

- Edit `public/index.html` to update the main page
- Add CSS, JavaScript, and other assets to the `public/` directory
- Modify `server.js` to add new API routes or server functionality

## Access

Once running, visit: http://localhost:3000