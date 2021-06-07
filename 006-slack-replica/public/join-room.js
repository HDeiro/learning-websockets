let currentRoom;

function updateRoomsGroup(rooms) {
    const gpRef     = $('.room-list');
    gpRef.innerHTML = '';

    rooms.forEach(room => {
        gpRef.innerHTML += `
            <li class="room" id="${room.roomId}">
                <span class="glyphicon glyphicon-${room.privateRoom ? 'lock' : 'globe'}"></span>
                ${room.roomTitle}
            </li>
        `
    });

    // Add click listener for each room
    $$('.room').forEach(element => element.addEventListener('click', () => {
        const roomName = element.innerText.trim();
        joinRoom(roomName);
    }))
    
    joinDefaultRoom();
}

function joinDefaultRoom() {
    const defaultRoom     = $('.room');
    const defaultRoomName = defaultRoom.innerText.trim();
    joinRoom(defaultRoomName);
}

function joinRoom(roomName) {
    if (roomName === currentRoom) {
        console.log('Trying to rejoin the current room');
        return;
    }

    console.log(`Joined room ${roomName}`);

    currentRoom = roomName;
    $('.curr-room-text').innerText = roomName;

    // Turn off old possible listeners
    nsSocket.off('messageToClients', addMessage);
    
    // Update room members total
    nsSocket.emit('joinRoom', roomName);

    // Handling messages received
    nsSocket.on('messageToClients', addMessage);

    // Handle room member count
    nsSocket.on('updateRoomMemberCount', newNumberOfMembers => $('.current-users-count').innerHTML = `${newNumberOfMembers}`)

    // Handling history catch up
    nsSocket.on(`historyCatchUp`, history => {
        clearMessages();
        history.forEach(addMessage);
    });

    // Handle searchbox
    const searchbox = $('#search-box');
    searchbox.addEventListener('input', () => {
        const criterion = searchbox.value.toLowerCase();

        [...$$('.message-text')].filter(element => {
            element.parentElement.parentElement.classList.remove('hidden');
            return element.innerText.toLowerCase().indexOf(criterion) < 0;
        }).map(el => el.parentElement.parentElement).forEach(element => element.classList.add('hidden'));
    })
}