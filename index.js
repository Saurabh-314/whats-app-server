const express = require('express');
const mongoose = require("mongoose");
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const userRoutes = require("./routes/userRoutes");
app.use(cors());

// const PORT = process.env.PORT // production 
const PORT = 5000 || process.env.PORT // development 

const MONGO_URL = "mongodb+srv://saurabh-314:9%40XmgUD2BnKk%217B@cluster0.jfrinjg.mongodb.net/whats-app?retryWrites=true&w=majority";

app.use(express.json());
// require("dotenv").config();

app.use("/auth", userRoutes);

const server = http.createServer(app);
require("dotenv").config();

mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("db connection successfully");
}).catch((err) => {
    console.log(err.message);
})

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ['GET', 'POST']
    }
})

io.on("connection", (socket) => {
    console.log('User Connected', socket.id)

    socket.on("join_room", (data) => {
        // console.log("data", data);
        socket.join(data.id);
    })

    socket.on("send_message", (data) => {
        // console.log('this is action of send data', data)
        socket.to(data.to).emit("receive_message", data)
    })

    socket.on("disconnect", () => {
        console.log('User Disconected', socket.id)
    })
})

server.listen(PORT, () => {
    console.log('SERVER RUNNING ')
})