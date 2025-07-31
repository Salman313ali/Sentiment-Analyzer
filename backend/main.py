from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import os
import re
from langchain_groq import ChatGroq
from langchain.prompts import ChatPromptTemplate
from langchain.schema.runnable import RunnablePassthrough

# Load environment variables
load_dotenv()

app = FastAPI(
    title="Sentiment Analyzer API",
    description="A professional sentiment analysis API using Groq and LangChain",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Groq client
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
if not GROQ_API_KEY:
    raise ValueError("GROQ_API_KEY environment variable is required")

llm = ChatGroq(api_key=GROQ_API_KEY, model_name="qwen/qwen3-32b")

# Define the sentiment analysis prompt
ANALYZER_PROMPT = ChatPromptTemplate.from_messages([
    (
        "system",
        "You are an expert sentiment analysis model. "
        "Your task is to classify the sentiment of the provided text as exactly one of: "
        "<NEGATIVE>, <NEUTRAL>, or <POSITIVE>. "
        "Respond with only the tag—no additional text or explanation."
    ),
    (
        "human",
        "Text to analyze:\n{input_text}"
    )
])

# Create the sentiment analysis chain
sentiment_chain = ANALYZER_PROMPT | llm

class SentimentRequest(BaseModel):
    text: str

class SentimentResponse(BaseModel):
    text: str
    sentiment: str
    confidence: float = 1.0

@app.get("/")
async def root():
    return {"message": "Sentiment Analyzer API is running"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "sentiment-analyzer"}

@app.post("/analyze", response_model=SentimentResponse)
async def analyze_sentiment(request: SentimentRequest):
    try:
        # Validate input
        if not request.text.strip():
            raise HTTPException(status_code=400, detail="Text cannot be empty")
        
        # Analyze sentiment
        result = sentiment_chain.invoke({"input_text": request.text})
        
        # Clean the response
        sentiment = re.sub(r'<think>.*?</think>', '', result.content.strip(), flags=re.DOTALL).strip()
        
        # Validate sentiment result
        valid_sentiments = ["<NEGATIVE>", "<NEUTRAL>", "<POSITIVE>"]
        if sentiment not in valid_sentiments:
            # If the model didn't return expected format, try to interpret
            sentiment_lower = sentiment.lower()
            if "negative" in sentiment_lower or "bad" in sentiment_lower:
                sentiment = "<NEGATIVE>"
            elif "positive" in sentiment_lower or "good" in sentiment_lower:
                sentiment = "<POSITIVE>"
            else:
                sentiment = "<NEUTRAL>"
        
        return SentimentResponse(
            text=request.text,
            sentiment=sentiment
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error analyzing sentiment: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 