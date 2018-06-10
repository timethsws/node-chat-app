const express = require('express')
const path = require('path')
const http = require('http')
const socketIO = require('socket.io')

var {generateMessage,generateLocationMessage} = require('./utils/message')
var publicPath = path.join(__dirname,'../public')
const port = process.env.PORT || 3000
var app = express();
var server = http.createServer(app)
var io = socketIO(server);

app.use(express.static(publicPath))

io.on('connection', (socket) => {
console.log('New client connected')


    socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app'));

    socket.broadcast.emit('newMessage',generateMessage('Admin','New user joined'));

    socket.on('disconnect',() => {
        console.log('Client disconnected')
    })

    socket.on('createMessage', (newMessage , callback) => {
        console.log('New message',newMessage)
        io.emit('newMessage',generateMessage(newMessage.from,newMessage.text));
        callback('this from the server')
        
    }) 

    socket.on ('createLocationMessage', (coords)=> {
        io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude,coords.longitude))
    })
    socket.emit('newMessage',{
        from : "Timeth",
        text : "Hey you got a new message",
        createdAt : 123456
    })

})

server.listen(port ,() => {
    console.log(`Server is up on port ${port}`)
})