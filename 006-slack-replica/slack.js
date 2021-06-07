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
    io.of(namespace.endpoint).on('connection', nsSocket => {
        console.log(`${nsSocket.id} has joined the namespace ${namespace.endpoint}`);

        // Sending back the particular namespace information back to the socket
        nsSocket.emit('nsRoomList', namespace.rooms);

        // Listening from a joining room request from the client
        nsSocket.on('joinRoom', roomToJoin => {
            nsSocket.join(roomToJoin);

            // Return the number of clients in a room
            const clientsInRoom = nsSocket.adapter.rooms.get(roomToJoin).size
            io.of(namespace.endpoint).in(roomToJoin).emit('updateRoomMemberCount', clientsInRoom);
            
            // Get history
            const nsRoom = namespace.rooms.find(({roomTitle}) => roomTitle === roomToJoin.trim());
            nsSocket.emit('historyCatchUp', (nsRoom ? nsRoom.history : []));

            console.log(`${nsSocket.id} joined room ${roomToJoin}`);
        });

        nsSocket.on('newMessageToServer', ({message, room}) => {
            console.log(`Received message to room ${room} with content ${message.text}`);
            // Get Room
            const nsRoom = namespace.rooms.find(({roomTitle}) => roomTitle === room.trim());
            nsRoom.addMessage(message);

            // Forward the message to ALL Sockets that are in the room THIS socket is in
            io.of(namespace.endpoint).to(room).emit('messageToClients', message);    
        });
    });
})