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

    socket.on('newMessageToServer', dataFromClient => {
        // Emit to all connected clients
        io.emit('messageToClients', dataFromClient);
    });
});

io.of('/admin').on('connection', socket => {
    console.log('Connected to ADMIN namespace');
    
    socket.emit('messageFromServer', {data: 'Welcome to the /admin namespace'});
    io.of('/admin').emit('WELCOME', 'Welcome to the Admin Site!');
})
