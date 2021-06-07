function addMessage(msg) {
    document.querySelector('#messages').innerHTML += `
        <li class="message-item">
            <div class="user-image">
                <img src="${msg.avatar}" />
            </div>
            <div class="user-message">
                <div class="user-name-time">${msg.username} <span>${msg.time}</span></div>
                <div class="message-text">${msg.text}</div>
            </div>
        </li>
    `;
}

// Handling message sending
document.querySelector('.message-form').addEventListener('submit', evt => {
    evt.preventDefault();

    const input = document.querySelector('#user-message');

    const message = {
        text: input.value,
        time: new Date().toLocaleTimeString(),
        username: 'hdeiro',
        avatar: 'https://via.placeholder.com/30'
    };

    addMessage(message);
    nsSocket.emit('newMessageToServer', {message, room: currentRoom});
});