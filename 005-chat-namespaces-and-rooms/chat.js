const express  = require('express');
const app      = express();
const socketio = require('socket.io');

app.use(express.static(`${__dirname}/public`));

const expressServer = app.listen(8000);
const io = socketio(expressServer);

io.on('connection', socket => {
    console.log('Connected to BASE namespace');
    // Emit to the single connected client
    socket.emit('messageFromServer', {data: 'Welcome to the Socket.io Server'});
    socket.on('messageToServer', dataFromClient => console.log(dataFromClient));
    // Joining rooms
    socket.join('level1');
    /**
     * For this case considering it's inside of a connection event one of the two clients
     * does not have enought time to connect and be ready to receive it. In this case
     * the socket io reference (io) should be the one to emit the event.
     */
    // socket.to('level1').emit('joined', `${socket.id} says I have joined the level 1 room`);
    io.to('level1').emit('joined', `${socket.id} says I have joined the level 1 room`);
});

io.of('/admin').on('connection', socket => {
    console.log('Connected to ADMIN namespace');
    
    socket.emit('messageFromServer', {data: 'Welcome to the /admin namespace'});
    io.of('/admin').emit('WELCOME', 'Welcome to the Admin Site!');
})
