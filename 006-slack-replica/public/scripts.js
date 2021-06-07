const root    = 'http://localhost:8000';
const socket1 = io(`${root}`);

socket1.on('connect', () => console.log(`Connected through ${socket1.id}`));

// Listen for nsList with all namespaces
socket1.on('nsList', updateNamespacesGroup);
