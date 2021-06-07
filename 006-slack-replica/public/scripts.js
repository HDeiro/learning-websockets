const root    = 'http://localhost:8000';
const socket1 = io(`${root}`);

socket1.on('connect', () => console.log(`Connected through ${socket1.id}`));

// Listen for nsList with all namespaces
socket1.on('nsList', updateNamespacesGroup);

// Handling Messages
document.querySelector('.message-form').addEventListener('submit', evt => {
    evt.preventDefault();

    const input = document.querySelector('#user-message');
    const text  = input.value;
    input.value = '';

    nsSocket.emit('newMessageToServer', {text});
});