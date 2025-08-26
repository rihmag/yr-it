import React, { useState, useRef, useEffect } from 'react';
import { Send, X, User, Bot, CornerDownLeft } from 'lucide-react';

export default function Chatbot() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Hello! I am your friendly neighborhood chatbot. How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const API_ENDPOINT = 'https://your-api-endpoint.com/chat';
  const API_KEY = 'your-api-key';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const sendMessageToAPI = async (message) => {
    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(API_KEY && { 'Authorization': `Bearer ${API_KEY}` })
        },
        body: JSON.stringify({ message, context: 'website_chat', timestamp: new Date().toISOString() })
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      return data.response || data.message || data.reply || 'Sorry, I couldn\'t process your request.';
    } catch (error) {
      console.error('API Error:', error);
      return 'Sorry, I\'m experiencing technical difficulties. Please try again later.';
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = { id: Date.now(), type: 'user', content: inputValue, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');
    setIsLoading(true);

    try {
      const botResponse = await sendMessageToAPI(currentInput);
      const botMessage = { id: Date.now() + 1, type: 'bot', content: botResponse, timestamp: new Date() };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = { id: Date.now() + 1, type: 'bot', content: 'Sorry, something went wrong. Please try again.', timestamp: new Date() };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date) => date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="relative inset-0 bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-100 flex items-center justify-center font-sans">
      <div className="w-full max-w-2xl h-[90vh] bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200/50">
        {/* Header */}
        <div className="flex items-center justify-between p-5 bg-white/90 backdrop-blur-sm border-b border-gray-200/50">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white">
              <Bot size={28} />
            </div>
            <div>
              <h1 className="font-bold text-xl text-gray-800">AI Assistant</h1>
              <p className="text-sm text-green-500 font-medium">Online</p>
            </div>
          </div>
          <button className="p-2 hover:bg-gray-200/50 rounded-full text-gray-500 hover:text-gray-800 transition-colors">
            <X size={22} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/50">
          {messages.map((message) => (
            <div key={message.id} className={`flex gap-3 ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${message.type === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}>
                {message.type === 'user' ? <User size={20} /> : <Bot size={20} />}
              </div>
              <div className={`max-w-md p-4 rounded-2xl ${message.type === 'user' ? 'bg-blue-500 text-white rounded-br-none' : 'bg-white text-gray-800 border border-gray-200/80 rounded-bl-none'}`}>
                <p className="text-base">{message.content}</p>
                <p className={`text-xs mt-2 ${message.type === 'user' ? 'text-blue-100/80' : 'text-gray-400'}`}>
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-300 text-gray-700">
                <Bot size={20} />
              </div>
              <div className="max-w-md p-4 rounded-2xl bg-white text-gray-800 border border-gray-200/80 rounded-bl-none">
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-pulse"></div>
                  <div className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-5 bg-white/90 backdrop-blur-sm border-t border-gray-200/50">
          <div className="flex items-center bg-gray-100 rounded-xl p-2">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything..."
              disabled={isLoading}
              className="flex-1 bg-transparent text-base text-gray-800 placeholder-gray-500 px-4 py-2 focus:outline-none disabled:opacity-60"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              className="bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white p-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <Send size={20} />
            </button>
          </div>
          <p className="text-xs text-center text-gray-400 mt-2">Press <CornerDownLeft size={12} className="inline-block" /> to send</p>
        </div>
      </div>
    </div>
  );
}