let nsSocket;
let currentNamespace;

function updateNamespacesGroup(namespaces) {
    const nsRef     = $('.namespaces');
    nsRef.innerHTML = '';

    // Add namespaces to DOM
    namespaces.forEach(ns => {
        nsRef.innerHTML += `
            <div class="namespace" ns="${ns.endpoint}" title="${ns.nsTitle}">
                <img src="${ns.image}" />
            </div>
        `;
    });

    $$('.namespace').forEach(element => element.addEventListener('click', () => {
        const ns = element.getAttribute('ns');
        console.log(`The endpoint to redirect is ${ns}`);
        joinNamespace(ns);
    }));

    joinDefaultNamespace();
}

function joinDefaultNamespace() {
    const defaultNamespace         = $('.namespace');
    const defaultNamespaceEndpoint = defaultNamespace.getAttribute('ns');
    joinNamespace(defaultNamespaceEndpoint);
}

function joinNamespace(endpoint) {
    if (nsSocket) {
        nsSocket.close();
        $('#user-input').removeEventListener('submit', onMessageSubmit, true);
    }

    currentNamespace = endpoint;

    // Create a new Socket
    nsSocket = io(`${root}${endpoint}`, {
        query: {
            username: "Hugo Deiró!"
        }
    });
    nsSocket.on('nsRoomList', updateRoomsGroup);

    // Read listener
    $('#user-input').addEventListener('submit', onMessageSubmit, true);
    
    console.log(`Joined the namespace ${endpoint}`);
}