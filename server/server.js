const express = require('express')
const path = require('path')
const http = require('http')
const socketIO = require('socket.io')

var { generateMessage, generateLocationMessage } = require('./utils/message')
const { isRealString } = require('./utils/validation')
const {Users} = require ('./utils/users')
var publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000
var app = express();
var server = http.createServer(app)
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath))

io.on('connection', (socket) => {
    console.log('New client connected')

    socket.on('join', (params, callback) => { 
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and room name are required');
        }

        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id,params.name,params.room)
        io.to(params.room).emit('updateUserList',users.getUserList(params.room));
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));
        callback();
    })



    socket.on('disconnect', () => {
        console.log('Client disconnected')

        var user = users.removeUser(socket.id);

        if(user) {
            io.to(user.room).emit('updateUserList',users.getUserList(user.room))
            io.to(user.room).emit('newMessage',generateMessage('Admin',`${user.name} has left`))
        }
    })

    socket.on('createMessage', (newMessage, callback) => {
        var user = users.getUser(socket.id);

        if(user && isRealString(newMessage.text)){
            io.to(user.room).emit('newMessage', generateMessage(user.name, newMessage.text));
        }
        
        callback()

    })

    socket.on('createLocationMessage', (coords) => {
        var user = users.getUser(socket.id);
        if (user){
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
        }
    })


})

server.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})