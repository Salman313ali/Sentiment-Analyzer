import React, { useState } from 'react';
import axios from 'axios';
import { Brain, Loader2, CheckCircle, AlertCircle, MinusCircle } from 'lucide-react';

function App() {
  const [text, setText] = useState('');
  const [sentiment, setSentiment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const analyzeSentiment = async () => {
    if (!text.trim()) {
      setError('Please enter some text to analyze');
      return;
    }

    setLoading(true);
    setError('');
    setSentiment(null);

    try {
      const response = await axios.post('/analyze', { text: text.trim() });
      setSentiment(response.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to analyze sentiment');
    } finally {
      setLoading(false);
    }
  };

  const getSentimentIcon = (sentiment) => {
    switch (sentiment) {
      case '<POSITIVE>':
        return <CheckCircle className="w-8 h-8 text-green-500" />;
      case '<NEGATIVE>':
        return <AlertCircle className="w-8 h-8 text-red-500" />;
      case '<NEUTRAL>':
        return <MinusCircle className="w-8 h-8 text-gray-500" />;
      default:
        return null;
    }
  };

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case '<POSITIVE>':
        return 'text-green-600 bg-green-50 border-green-200';
      case '<NEGATIVE>':
        return 'text-red-600 bg-red-50 border-red-200';
      case '<NEUTRAL>':
        return 'text-gray-600 bg-gray-50 border-gray-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getSentimentLabel = (sentiment) => {
    switch (sentiment) {
      case '<POSITIVE>':
        return 'Positive';
      case '<NEGATIVE>':
        return 'Negative';
      case '<NEUTRAL>':
        return 'Neutral';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Brain className="w-12 h-12 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">Sentiment Analyzer</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Analyze the sentiment of any text using advanced AI technology powered by Groq
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {/* Input Section */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Enter Text to Analyze</h2>
            
            <div className="mb-4">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter your text here to analyze its sentiment..."
                className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                disabled={loading}
              />
            </div>

            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                {text.length} characters
              </div>
              
              <button
                onClick={analyzeSentiment}
                disabled={loading || !text.trim()}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Brain className="w-5 h-5 mr-2" />
                    Analyze Sentiment
                  </>
                )}
              </button>
            </div>

            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600">{error}</p>
              </div>
            )}
          </div>

          {/* Results Section */}
          {sentiment && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Analysis Results</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Original Text */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Original Text</h3>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-700">{sentiment.text}</p>
                  </div>
                </div>

                {/* Sentiment Result */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Sentiment</h3>
                  <div className={`p-4 rounded-lg border ${getSentimentColor(sentiment.sentiment)}`}>
                    <div className="flex items-center">
                      {getSentimentIcon(sentiment.sentiment)}
                      <span className="ml-3 text-lg font-semibold">
                        {getSentimentLabel(sentiment.sentiment)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Confidence */}
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Confidence</h3>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${sentiment.confidence * 100}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {(sentiment.confidence * 100).toFixed(1)}% confidence
                </p>
              </div>
            </div>
          )}

          {/* Features Section */}
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <Brain className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">AI-Powered</h3>
              <p className="text-gray-600">Advanced language models for accurate sentiment analysis</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Fast & Reliable</h3>
              <p className="text-gray-600">Quick analysis with high accuracy and reliability</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <AlertCircle className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Professional</h3>
              <p className="text-gray-600">Production-ready API with comprehensive error handling</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App; 