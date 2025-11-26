// Import necessary modules
import { Server } from "socket.io";
import express from "express";
import http from "http";

// Initialize express app
const app = express();

// Create HTTP server using Express app
const server = http.createServer(app);

// Initialize a new socket io server instance
const io = new Server(server, {
  cors: {
    origin: process.env.URL, // Allow connections only for this url
    methods: ["GET", "POST"], // Restrict allowed methods
  },
});

// Map to store userId -> socketId mapping
// This help identify which user is connected to which socket
const userSocketMap = {};

// Utility function to get Socket ID of a particular receiver
export const getReceiverSocketId = (receiverId) => {
  userSocketMap[receiverId];
};

// Listen for a new cilent connections
io.on("connection", (socket) => {
  // Extract userId from the client connection query parameters
  const userId = socket.handshake.query.userId;
  // If a valid userId is provided store the mapping
  console.log("Socket connected:", { userId, socketId: socket.id });
  if (userId) {
    userSocketMap[userId] = socket.id;
  }
  // Emit the list of currently online users to all connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // Handle user disconnection
  socket.on("disconnect", () => {
    // Remove user from the map when they diconnet
    if (userId) {
      delete userSocketMap[userId];
    }
    // Broadcast updated online user list
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

// Export app, server and io for use in other modules (index.js)
export { app, server, io };
