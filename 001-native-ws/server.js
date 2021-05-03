const http      = require('http');
const websocket = require('ws');

const server = http.createServer((req, res) => {
    res.end('I am connected')
});

const wss = new websocket.Server({ server });

wss.on('headers', (headers, req) => {
    console.log('Headers: \n\n', headers, '\n');
});

wss.on('connection', (ws, req) => {
    console.log('WS: \n\n', ws, '\n');
    
    ws.send('Welcome to the websocket server!');

    ws.on('message', msg => {
        console.log('Receive the following message from the client: \n\t', msg)
    })
});

server.listen(8000);