// components/Chatbot.js
import React, { useState, useContext } from 'react';
import { WellContext } from '../context/WellContext';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { sender: 'ai', text: "Hi, I'm Drill AI. Ask me anything about this well!" },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { selectedWell } = useContext(WellContext);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: input, well: selectedWell }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from AI.');
      }

      const result = await response.json();
      const aiMessage = { sender: 'ai', text: result.reply };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage = { sender: 'ai', text: "Sorry, I'm having trouble connecting. Please try again." };
      setMessages((prev) => [...prev, errorMessage]);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <aside className="w-96 bg-white border-l flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold">Drill AI</h2>
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs px-4 py-2 rounded-lg ${
                  msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800">
                Typing...
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="p-4 border-t">
        <form onSubmit={handleSendMessage}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message here..."
            className="w-full p-2 border rounded-md"
            disabled={isLoading}
          />
        </form>
      </div>
    </aside>
  );
};

export default Chatbot;
