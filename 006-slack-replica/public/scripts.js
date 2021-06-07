const root    = 'http://localhost:8000';
const socket1 = io(`${root}`);

socket1.on('connect', () => console.log(`Connected through ${socket1.id}`));

// Listen for nsList with all namespaces
socket1.on('nsList', updateNamespacesGroup)

// Utilitary Function

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
        })
    );

}