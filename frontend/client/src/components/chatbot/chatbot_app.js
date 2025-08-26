const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config(); // Load environment variables

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Ensure this matches your frontend port
    methods: ["GET", "POST"]
  }
});

// Initialize OpenAI API
const configuration = new Configuration({
  organization: process.env.OPENAI_API_ORG,
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// Function to get AI response from OpenAI
async function getAIResponse(userInput) {
  try {
    const response = await openai.createCompletion({
      model: "gpt-4", // You can adjust this to use other models like "gpt-3.5-turbo"
      prompt: userInput,
      max_tokens: 150,
    });
    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error("Error with OpenAI API:", error);
    return "Sorry, I couldn't process your request at the moment.";
  }
}

// Chatbot WebSocket logic
io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('answer', async (answer) => {
    try {
      // Get AI response from OpenAI API
      const aiResponse = await getAIResponse(answer);
      
      // Send the AI's response back to the client
      socket.emit('question', aiResponse);
    } catch (error) {
      socket.emit('question', 'Something went wrong. Please try again later.');
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Start server
server.listen(4000, () => {
  console.log('Server is running on port 4000');
});
