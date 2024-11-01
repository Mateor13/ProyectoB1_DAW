import { filterAgents, resetFilter} from './assets/js/agents.js';
import { fetchMaps} from './assets/js/maps.js';
import { fetchGameModes } from './assets/js/gameModes.js';
import { fetchWeapons} from './assets/js/weapons.js';

document.addEventListener('DOMContentLoaded', async () => {
    // Carga los mapas y los modos de juego
    await fetchMaps();
    await fetchGameModes();
    await fetchWeapons();
});

// Filtrar agentes por rol cuando cambie la selección
document.getElementById('role-filters').addEventListener('change', (e) => {
    const role = e.target.value;
    if (role === 'all') {
        resetFilter();
    } else {
        filterAgents(role);
    }
});
