require('dotenv').config();

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Your frontend port
    methods: ["GET", "POST"]
  }
});

// AI chatbot logic
const chatbotFlow = [
  { question: "Are you a first-time home buyer?", key: "firstTimeBuyer" },
  { question: "What is your budget?", key: "budget", dependsOn: { firstTimeBuyer: 'yes' } },
  { question: "How do you plan to finance your home?", key: "financing", dependsOn: { firstTimeBuyer: 'yes' } },
  { question: "What house condition are you looking for (new, used, renovated)?", key: "houseCondition", dependsOn: { firstTimeBuyer: 'yes' } },
  { question: "What's your preferred timeline for buying?", key: "timeline", dependsOn: { firstTimeBuyer: 'yes' } },
  { question: "Where do you want to buy (location)?", key: "location", dependsOn: { firstTimeBuyer: 'yes' } }
];

io.on('connection', (socket) => {
  console.log('User connected');
  
  let currentStep = 0;
  const userData = {};

  // Send the first question
  socket.emit('question', chatbotFlow[currentStep].question);

  // Listen for user's response
  socket.on('answer', (answer) => {
    const currentQuestion = chatbotFlow[currentStep];

    // Store user's response
    userData[currentQuestion.key] = answer;

    // Check if the next question is relevant
    currentStep++;
    let nextQuestion = chatbotFlow[currentStep];

    // Skip irrelevant questions
    while (nextQuestion && nextQuestion.dependsOn && userData[nextQuestion.dependsOn.firstTimeBuyer] !== 'yes') {
      currentStep++;
      nextQuestion = chatbotFlow[currentStep];
    }

    // If there’s another question, ask it
    if (nextQuestion) {
      socket.emit('question', nextQuestion.question);
    } else {
      // End of chatbot conversation
      socket.emit('complete', `Thanks for answering! Here’s what we got: ${JSON.stringify(userData)}`);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(4000, () => {
  console.log('Chatbot server is running on port 4000');
});
