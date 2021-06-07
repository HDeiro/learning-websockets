const express    = require('express');
const app        = express();
const socketio   = require('socket.io');
const namespaces = require('./data/namespaces');

app.use(express.static(`${__dirname}/public`));

const expressServer = app.listen(8000);
const io = socketio(expressServer);

io.on('connection', socket => {
    // Build an array to send back with image and endpoint for each namespace
    const nsData = namespaces.map(({image, endpoint, nsTitle}) => ({image, endpoint, nsTitle}));

    // Send data back to client via socket. Using socket instead of IO to be a message to the specific socket
    socket.emit('nsList', nsData);
});

// Loop through each namespace and listen for a connection
namespaces.forEach(namespace => {
    io.of(namespace.endpoint).on('connection', socket => {
        console.log(`${socket.id} has joined ${namespace.endpoint}`);
    })
})