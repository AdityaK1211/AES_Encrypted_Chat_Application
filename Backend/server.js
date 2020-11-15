const express = require("express");
const app = express();
const socket = require("socket.io");
const color = require("colors");
const { getCurrentUser, userLeave, userJoin } = require("./dummyuser");

var server = app.listen('3000', () => {
	console.log("Server Started on port 3000").yellow.bold;
});

const io = socket(server);
io.on("connection", (socket) => {
    
    // New User Joins
    socket.on("joinRoom", ({ username, roomname }) => {
        // Create User    
        const user = userJoin(socket.id, username, roomname);
        console.log(socket.id, "=id");
        socket.join(user.room);

        // Welcome Message
        socket.emit("message", {
            userId: user.id,
            username: user.username,
            text: `Welcome ${user.username}`,
        });

        // Broadcast Message
        socket.broadcast.to(user.room).emit("message", {
            userId: user.id,
            username: user.username,
            text:  `${user.username} has joined the chat`,
        });
    });
    
    //User Chat
    socket.on("chat", (text) => {
        
        const user = getCurrentUser(socket.id);
        io.to(user.room).emit("message", {
            userId: user.id,
            username: user.username,
            text: text,
        });
    });

    // User Disconnect
    socket.on("disconnect", () => {
        const user = userLeave(socket.id);
        if(user) {
            io.to(user.room).emit("message", {
                userId: user.id,
                username: user.username,
                text: `${user.username} has left the chat`,
            });
        }
    });
});