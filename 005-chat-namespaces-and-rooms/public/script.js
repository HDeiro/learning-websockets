const form        = document.querySelector('#message-form');
const input       = document.querySelector('#user-message');
const messages    = document.querySelector('#messages');

const socket      = io('http://localhost:8000/');
const socketAdmin = io('http://localhost:8000/admin');

// ########################## BASE

socket.on('messageFromServer', dataFromServer => {
    console.log('From Server: ', dataFromServer);
    socket.emit('messageToServer', {data: 'This is from the client!'});
});

socket.on('joined', console.log);

// ########################## ADMIN

socketAdmin.on('messageFromServer', dataFromServer => {
    console.log('From Server: ', dataFromServer);
    socketAdmin.emit('messageToServer', {data: 'This is from the client!'});
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