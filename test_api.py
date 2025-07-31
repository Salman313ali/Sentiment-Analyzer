#!/usr/bin/env python3
"""
Simple test script for the Sentiment Analyzer API
"""

import requests
import json
import time

def test_sentiment_api():
    """Test the sentiment analysis API"""
    
    base_url = "http://localhost:8000"
    
    # Test cases
    test_cases = [
        "I love this product! It's amazing!",
        "This is terrible. I hate it.",
        "The weather is okay today.",
        "I'm feeling neutral about this.",
        "This is absolutely fantastic and wonderful!",
        "I'm very disappointed with the service."
    ]
    
    print("🧪 Testing Sentiment Analyzer API")
    print("=" * 50)
    
    # Test health endpoint
    try:
        response = requests.get(f"{base_url}/health")
        if response.status_code == 200:
            print("✅ Health check passed")
        else:
            print("❌ Health check failed")
            return
    except requests.exceptions.ConnectionError:
        print("❌ Cannot connect to API. Make sure the backend is running on http://localhost:8000")
        return
    
    # Test sentiment analysis
    for i, text in enumerate(test_cases, 1):
        print(f"\n📝 Test {i}: {text[:50]}{'...' if len(text) > 50 else ''}")
        
        try:
            response = requests.post(
                f"{base_url}/analyze",
                json={"text": text},
                headers={"Content-Type": "application/json"}
            )
            
            if response.status_code == 200:
                result = response.json()
                sentiment = result.get("sentiment", "Unknown")
                print(f"✅ Sentiment: {sentiment}")
            else:
                print(f"❌ Error: {response.status_code} - {response.text}")
                
        except requests.exceptions.RequestException as e:
            print(f"❌ Request failed: {e}")
        
        # Small delay between requests
        time.sleep(0.5)
    
    print("\n" + "=" * 50)
    print("🎉 API testing completed!")

if __name__ == "__main__":
    test_sentiment_api() 