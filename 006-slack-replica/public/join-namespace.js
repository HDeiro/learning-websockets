let nsSocket;

function updateNamespacesGroup(namespaces) {
    const nsRef     = document.querySelector('.namespaces');
    nsRef.innerHTML = '';

    // Add namespaces to DOM
    namespaces.forEach(ns => {
        nsRef.innerHTML += `
            <div class="namespace" ns="${ns.endpoint}" title="${ns.nsTitle}">
                <img src="${ns.image}" />
            </div>
        `;
    });

    document.querySelectorAll('.namespace').forEach(element => 
        element.addEventListener('click', () => {
            const ns = element.getAttribute('ns');
            console.log(`The endpoint to redirect is ${ns}`);
            joinNamespace(ns);
        })
    );

    joinDefaultNamespace();
}

function joinDefaultNamespace() {
    const defaultNamespace         = document.querySelector('.namespace');
    const defaultNamespaceEndpoint = defaultNamespace.getAttribute('ns');
    joinNamespace(defaultNamespaceEndpoint);
}

function joinNamespace(endpoint) {
    nsSocket = io(`${root}${endpoint}`);
    nsSocket.on('nsRoomList', updateRoomsGroup);
    console.log(`Joined the namespace ${endpoint}`);
}