const form        = document.querySelector('#message-form');
const input       = document.querySelector('#user-message');
const messages    = document.querySelector('#messages');
const socket      = io('http://localhost:8000/');
const socketAdmin = io('http://localhost:8000/admin');

// ########################## BASE

socket.on('connect', () => {
    console.log('Socket base = ', socket.id, socket.nsp)
});

socket.on('messageFromServer', dataFromServer => {
    console.log('From Server: ', dataFromServer);
    socket.emit('messageToServer', {data: 'This is from the client!'});
});

socket.on('messageToClients', dataFromServer => {
    console.log('From Server!', dataFromServer);
    
    const li     = document.createElement('li');
    li.innerText = dataFromServer.data;
    input.value  = "";
    messages.appendChild(li);
});

// ########################## ADMIN

socketAdmin.on('connect', () => {
    console.log('Socket Admin = ', socketAdmin.id, socketAdmin.nsp)
});

socketAdmin.on('messageFromServer', dataFromServer => {
    console.log('From Server: ', dataFromServer);
    socketAdmin.emit('messageToServer', {data: 'This is from the client!'});
});

socketAdmin.on('messageToClients', dataFromServer => {
    console.log('From Server!', dataFromServer);
    
    const li     = document.createElement('li');
    li.innerText = dataFromServer.data;
    input.value  = "";
    messages.appendChild(li);
});

// ########################## FORM HANDLING

form.addEventListener('submit', evt => {
    evt.preventDefault();
    const data = input.value;

    if (!data) {
        return;
    }
    
    socket.emit('newMessageToServer', { data });
});