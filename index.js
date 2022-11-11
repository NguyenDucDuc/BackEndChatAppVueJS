const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const mongoose = require('mongoose')
const cors = require('cors')
const io = new Server(server, {
    cors: {
        origin: "http://localhost:8080",
        methods: ["GET", "POST"]
      }
});
const morgan = require('morgan');
const bodyParser = require('body-parser')
const { Message } = require('./models/Message');
const { userRoute } = require('./routes/UserRoute');
const { messageRoute } = require('./routes/MessageRoute');
app.use(cors())
require('dotenv').config()

mongoose.connect(`${process.env.mongo_db_url}/VueChatApp`, () => {
    console.log('database is connected')
})

app.use(bodyParser.json())
app.use(morgan('common'))
app.use('/api/v1', userRoute)
app.use('/api/v1', messageRoute)


let userOnline = []

//SOCKET
io.on('connection', (socket) => {
    console.log(socket.id)
    socket.emit('serverResendConnection', socket.id)
    socket.on('login', userId => {
        userOnline = userOnline.filter(u => u.userId !== userId)
        userOnline.push({userId: userId, socketId: socket.id})
        console.log(userOnline)
    })
    
    
    socket.on('clientSendMessage', data => {
        console.log(data)
        // socket.broadcast.emit('serverReSendMessage', data)
        const receiver = userOnline.find(u => u.userId === data.receiverId)
        if(receiver !== undefined){
            console.log(receiver.userId)
            io.to(`${receiver.socketId}`).emit('serverReSendMessage', data)
        }
        
    })
    socket.on('test', data => {
        console.log(data)
        socket.emit('serverTest', data)
    })
    socket.on('clientLogin', data => {
        console.log(data)
        socket.broadcast.emit('serverReSend',data)
    })
})

server.listen(8000, () => {
    console.log('server is running...')
})