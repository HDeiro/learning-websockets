function updateRoomsGroup(rooms) {
    const gpRef     = document.querySelector('.room-list');
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
    document.querySelectorAll('.room').forEach(element => 
        element.addEventListener('click', () => {
            const roomName = element.innerText;
            console.log(`Joining Room ${roomName}`);
            joinRoom(roomName);
        })
    )
    
    joinDefaultRoom();
}

function joinDefaultRoom() {
    const defaultRoom     = document.querySelector('.room');
    const defaultRoomName = defaultRoom.innerText;
    joinRoom(defaultRoomName);
}

function joinRoom(roomName) {
    console.log(`Joined room ${roomName}`);
    nsSocket.emit('joinRoom', roomName, newNumberOfMembers => {
        // Update room members total
        document.querySelector('.curr-room-num-users').innerHTML = `${newNumberOfMembers} <span class="glyphicon glyphicon-user"></span>`;
    });
}