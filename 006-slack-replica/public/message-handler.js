function addMessage(msg) {
    $('#messages').innerHTML += `
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

function clearMessages() {
    $('#messages').innerHTML = ``;
}

// Handling message sending
function onMessageSubmit(evt) {
    evt.preventDefault();

    const input = $('#user-message');

    const message = {
        username: 'hdeiro',
        text: input.value,
        time: new Date().toLocaleTimeString(),
        avatar: 'https://via.placeholder.com/30'
    };

    input.value = '';

    nsSocket.emit('newMessageToServer', {message, room: currentRoom});
}