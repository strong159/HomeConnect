import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './Chatbot.scss'; // Your styles for the chatbot

const socket = io('http://localhost:4000'); // Connect to the backend server

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  // Listen for messages from the backend (AI response)
  useEffect(() => {
    socket.on('question', (aiResponse) => {
      setMessages((prev) => [...prev, { from: 'bot', text: aiResponse }]);
    });

    return () => socket.off();
  }, []);

  // Send user input to backend
  const sendMessage = () => {
    if (input.trim()) {
      socket.emit('answer', input); // Send input to the server
      setMessages((prev) => [...prev, { from: 'user', text: input }]);
      setInput(''); // Clear input field
    }
  };

  return (
    <div className="chatbot">
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div key={index} className={msg.from === 'bot' ? 'bot-message' : 'user-message'}>
            {msg.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask the assistant..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chatbot;
