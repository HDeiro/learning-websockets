const express  = require('express');
const app      = express();
const socketio = require('socket.io');

app.use(express.static(`${__dirname}/public`));

const expressServer = app.listen(8000);
const io = socketio(expressServer);

io.on('connection', socket => {
    // Emit to the single connected client
    socket.emit('messageFromServer', {data: 'Welcome to the Socket.io Server'});

    socket.on('messageToServer', dataFromClient => console.log(dataFromClient));

    socket.on('newMessageToServer', dataFromClient => {
        // Emit to all connected clients
        io.emit('messageToClients', dataFromClient);
    });
})
