const http     = require('http');
const socketio = require('socket.io');

const server = http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
    });

    res.end('I am connected')
});

const io = socketio(server);

io.on('connection', (socket, req) => {
    socket.emit('WELCOME-EVENT-TYPE', 'Welcome to the websocket server with socket.io!');

    socket.on('WELCOME-EVENT-TYPE', msg => console.log(msg));
})

server.listen(8000);