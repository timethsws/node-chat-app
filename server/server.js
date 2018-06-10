const express = require('express')
const path = require('path')
const http = require('http')
const socketIO = require('socket.io')

var publicPath = path.join(__dirname,'../public')
const port = process.env.PORT || 3000
var app = express();
var server = http.createServer(app)
var io = socketIO(server);

app.use(express.static(publicPath))

io.on('connection', (socket) => {
console.log('New client connected')


    socket.emit('newMessage',{
        from : 'Admin',
        message : 'Welcome to the chat App',
        createdAt : new Date().getTime()
    })

    socket.broadcast.emit('newMessage',{
        from : 'Admin',
        message : 'New user joined the chat',
        createdAt : new Date().getTime()
    })

    socket.on('disconnect',() => {
        console.log('Client disconnected')
    })

    socket.on('createMessage', (newMessage) => {
        console.log('New message',newMessage)
        io.emit('newMessage',{
            from : newMessage.to,
            text : newMessage .text,
            createdAt : new Date().getTime()
        })

        // socket.broadcast.emit('newMessage',{
        //     rom : newMessage.to,
        //     text : newMessage .text,
        //     createdAt : new Date().getTime()

        // })
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