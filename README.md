# Sentiment Analyzer Web App

A professional production-ready sentiment analysis web application built with FastAPI backend and React frontend, powered by Groq AI.

## Features

- 🤖 **AI-Powered Analysis**: Uses advanced language models for accurate sentiment classification
- ⚡ **Fast & Reliable**: Quick analysis with high accuracy
- 🎨 **Modern UI**: Beautiful, responsive interface built with React and Tailwind CSS
- 🔧 **Production Ready**: Comprehensive error handling and API documentation
- 📊 **Real-time Results**: Instant sentiment analysis with confidence scores


### Backend
- **FastAPI**: Modern, fast web framework for building APIs
- **LangChain**: Framework for developing applications with LLMs
- **Groq**: High-performance AI inference platform
- **Pydantic**: Data validation using Python type annotations

### Frontend
- **React**: JavaScript library for building user interfaces
- **Tailwind CSS**: Utility-first CSS framework
- **Axios**: HTTP client for API requests
- **Lucide React**: Beautiful icons

## Project Structure

```
sentiment-analyzer/
├── backend/
│   ├── main.py              # FastAPI application
│   └── env.example          # Environment variables template
├── frontend/
│   ├── public/
│   │   └── index.html       # HTML template
│   ├── src/
│   │   ├── App.js           # Main React component
│   │   ├── index.js         # React entry point
│   │   └── index.css        # Global styles
│   ├── package.json         # Frontend dependencies
│   ├── tailwind.config.js   # Tailwind configuration
│   └── postcss.config.js    # PostCSS configuration
├── requirements.txt          # Python dependencies
└── README.md               # This file
```

## Setup Instructions

### Prerequisites

- Python 3.8+
- Node.js 16+
- Groq API key

### Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Create a virtual environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r ../requirements.txt
   ```

4. **Set up environment variables:**
   ```bash
   cp env.example .env
   ```
   Edit `.env` and add your Groq API key:
   ```
   GROQ_API_KEY=your_groq_api_key_here
   ```

5. **Run the backend server:**
   ```bash
   python main.py
   ```
   The API will be available at `http://localhost:8000`

### Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```
   The app will be available at `http://localhost:3000`


## Environment Variables

### Backend (.env)
- `GROQ_API_KEY`: Your Groq API key (required)
- `HOST`: Server host (default: 0.0.0.0)
- `PORT`: Server port (default: 8000)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For issues and questions, please open an issue on the repository. 