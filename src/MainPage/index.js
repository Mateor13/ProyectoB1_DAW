import {filterAgents,resetFilter,initializeApp } from './assets/js/agents.js';
import { fetchMaps} from './assets/js/maps.js';
import {fetchGameModes} from './assets/js/gameModes.js';


//* Agents
// Llama a initializeApp para inicializar la aplicación
window.onload = initializeApp;

// Puedes usar las otras funciones cuando las necesites, por ejemplo:
document.getElementById('role-filters').addEventListener('change', (e) => {
    const role = e.target.value;
    if (role === 'all') {
        resetFilter();
    } else {
        filterAgents(role);
    }
});

//* Maps

document.addEventListener('DOMContentLoaded', async () => {
    await fetchMaps(); // Carga los mapas al iniciar
});

document.addEventListener('DOMContentLoaded', async () => {
    await fetchGameModes(); // Carga los modos de jugo al iniciar
});