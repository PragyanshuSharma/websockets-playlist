const express = require('express');
const socket = require('socket.io');
const bodyparser = require('body-parser');
const login = require('./login');
const messages = require('./messages');
const signup=require('./signup');

// App setup
const app = express();
const server = app.listen(4000, function(){
    console.log('listening for requests on port 4000,');
});

// Static files
app.use(express.static('public'));
app.use(bodyparser.json());
app.use('/login',login);
app.use('/signup',signup);
app.use('/messages',messages);




// Socket setup & pass server
const io = socket(server);
io.on('connection', (socket) => {

    console.log('made socket connection', socket.id);

    // Handle chat event
    socket.on('chat', function(data){
         console.log(data);
        io.sockets.emit('chat', data);
        // socket.broadcast.emit('chat', data);
    });

    // Handle typing event
    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });

});
