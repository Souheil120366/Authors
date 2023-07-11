const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const cors = require('cors');
const socket = require('socket.io');
require('dotenv').config();
app.use(cors({origin: 'http://192.168.1.249:3002'}));
app.use(express.json());                          
app.use(express.urlencoded({ extended: true })); 
require('./config/mongoose.config'); 
require('./routes/author.routes')(app);

const io = socket(server, {
    cors: {
        origin: 'http://192.168.1.249:3002',
        methods: ['GET', 'POST'],
        allowedHeaders: ['*'],
        credentials: true,
    }
});

io.on("connection", (socket) => {
    console.log("Server Side socket id: " + socket.id);

    socket.on("new_author_added", (data) => {
        console.log("***********new author added**********");
        console.log(data);
        socket.broadcast.emit("added_author", data);
    });

    socket.on("updated_author", (data) => {
        console.log("**********updated author**********");
        console.log(data);
        socket.broadcast.emit("author_updated", data);
    });

    socket.on("deleted_author", (data) => {
        console.log("*********deleted author**************");
        console.log(data);
        socket.broadcast.emit("author_deleted", data);
    });
});

server.listen(8002, () => {
    console.log("Listening at Port 8002")
})