let allAgents = []; // Variable para almacenar todos los agentes

const fetchAgents = async () => {
    try {
        const response = await fetch('https://valorant-api.com/v1/agents?isPlayableCharacter=true&language=es-ES');
        const data = await response.json();
        allAgents = data.data; // Guarda todos los agentes
        await displayAgents(allAgents); // Muestra todos los agentes al inicio
    } catch (error) {
        console.error('Error fetching agents:', error);
    }
};

// Function to display agents in cards
const displayAgents = async (agents) => {
    const listAgents = document.getElementById('list-agents');
    listAgents.innerHTML = ''; // Clear previous content

    const fragment = document.createDocumentFragment();

    agents.forEach(agent => {
        const card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
            <img class="card-img-top lazy-load" data-src="${agent.displayIcon}" alt="${agent.displayName}">
            <div class="card-body">
                <h5 class="card-title">${agent.displayName}</h5>
                <p class="card-text">${agent.description.substring(0, 80)}...</p>
                <button class="btn-primary" onclick="showModal(${JSON.stringify(agent).replace(/"/g, '&quot;')})">INFO</button>
            </div>
        `;
        fragment.appendChild(card);
    });

    // Agregar todas las tarjetas al contenedor a la vez
    listAgents.appendChild(fragment);
    await lazyLoadImages(); // Iniciar carga diferida de imágenes
};

// Function to filter agents by role
const filterAgents = async (role) => {
    const filteredAgents = allAgents.filter(agent => agent.role.displayName === role);
    await displayAgents(filteredAgents);
};

// Function to reset the filter and show all agents
const resetFilter = async () => {
    await displayAgents(allAgents);
};

// Function to display modal with agent information
const showModal = (agent) => {
    const modal = document.getElementById('agentModal');
    const modalBody = document.getElementById('modal-body');
    modal.style.display = 'block';

    modalBody.innerHTML = `
    <div class="modal-content">
        <span class="close-button" id="modal-close">&times;</span>
        <img style="background-image: url('${agent.background}');background-size: cover; background-position: center;" src="${agent.fullPortrait}" alt="${agent.displayName}" class="modal-image">
        <h2 class="agent-name">${agent.displayName}</h2>
        <p class="agent-description">${agent.description}</p>
        <h4 class="agent-role">Rol: ${agent.role.displayName}</h4>
        <p class="role-description">${agent.role.description}</p>
        <h5 class="agent-abilities">Habilidades:</h5>
        <ul class="ability-list">
            ${agent.abilities.map(ability => `
                <li><strong>${ability.displayName}</strong>: ${ability.description}</li><br>
            `).join('')}
        </ul>
    </div>
    `;

    // Add event listener to close button
    document.getElementById('modal-close').addEventListener('click', () => {
        modal.style.display = 'none';
    });
};

// Lazy load images
const lazyLoadImages = async () => {
    const lazyImages = document.querySelectorAll('.lazy-load');
    const config = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src; // Carga la imagen
                img.classList.remove('lazy-load'); // Elimina la clase de carga diferida
                observer.unobserve(img); // Deja de observar esta imagen
            }
        });
    }, config);

    lazyImages.forEach(img => {
        observer.observe(img);
    });
};

// Fetch and display agents when the page loads
const initializeApp = async () => {
    await fetchAgents(); // Esta llamada asegura que todos los agentes se carguen al inicio
};

// Llamar a la función cuando la ventana se carga
window.onload = initializeApp;

export {
    fetchAgents,
    displayAgents,
    filterAgents,
    resetFilter,
    showModal,
    initializeApp
};

window.filterAgents = filterAgents;
window.resetFilter = resetFilter;
window.showModal = showModal