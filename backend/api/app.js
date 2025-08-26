// backend/app.js
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import http from "http";
import authRoute from "./routes/auth.route.js";
import postRoute from "./routes/post.route.js";
import userRoute from "./routes/user.route.js";

// Initialize Express and HTTP server
const app = express();
const server = http.createServer(app);

// Middlewares
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);

// Socket.IO setup
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
  },
});

let onlineUser = [];
const addUser = (userId, socketId) => {
  const userExists = onlineUser.find((user) => user.userId === userId);
  if (!userExists) onlineUser.push({ userId, socketId });
};

io.on("connection", (socket) => {
  socket.on("newUser", (userId) => addUser(userId, socket.id));

  // Handle Chatbot logic
  let currentStep = 0;
  const userData = {};
  const chatbotFlow = [
    { question: "Are you a first-time home buyer?", key: "firstTimeBuyer" },
    // Other questions here...
  ];

  socket.emit('question', chatbotFlow[currentStep].question);

  socket.on('answer', (answer) => {
    userData[chatbotFlow[currentStep].key] = answer;
    currentStep++;
    const nextQuestion = chatbotFlow[currentStep];
    if (nextQuestion) {
      socket.emit('question', nextQuestion.question);
    } else {
      socket.emit('complete', `Thanks for answering: ${JSON.stringify(userData)}`);
    }
  });

  socket.on("disconnect", () => {
    onlineUser = onlineUser.filter((user) => user.socketId !== socket.id);
  });
});

// Start the server
server.listen(8800, () => {
  console.log("Server is running on port 8800!");
});
