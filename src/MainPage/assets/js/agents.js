let allAgents = [];

const fetchAgents = async () => {
    try {
        const response = await fetch('https://valorant-api.com/v1/agents?isPlayableCharacter=true&language=es-MX');
        const data = await response.json();
        allAgents = data.data;
        displayAgents(allAgents); // Muestra todos los agentes al inicio
    } catch (error) {
        console.error('Error fetching agents:', error);
    }
};

const displayAgents = (agents) => {
    const listAgents = document.getElementById('list-agents');
    listAgents.innerHTML = '';

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

    listAgents.appendChild(fragment);
    lazyLoadImages(); // Carga diferida de imágenes
};

const filterAgents = (role) => {
    const filteredAgents = allAgents.filter(agent => agent.role.displayName === role);
    displayAgents(filteredAgents);
};

const resetFilter = () => displayAgents(allAgents);

const showModal = (agent) => {
    const modal = document.getElementById('agentModal');
    const modalBody = document.getElementById('modal-body');
    modal.style.display = 'block';

    modalBody.innerHTML = `
        <div class="modal-content">
            <span class="close-button" id="modal-close">&times;</span>
            <img style="background-image: url('${agent.background}'); background-size: cover; background-position: center;" 
                 data-full-src="${agent.fullPortrait}" 
                 alt="${agent.displayName}" 
                 class="modal-image" 
                 src="placeholder.jpg"> <!-- Placeholder aquí -->
            <h2 class="agent-name">${agent.displayName}</h2>
            <p class="agent-description">${agent.description}</p>
            <h4 class="agent-role">Rol: ${agent.role.displayName}</h4>
            <p class="role-description">${agent.role.description}</p>
            <h5 class="agent-abilities">Habilidades:</h5>
            <ul class="ability-list">
                ${agent.abilities.map(ability => `<li><strong>${ability.displayName}</strong>: ${ability.description}</li><br>`).join('')}
            </ul>
        </div>
    `;

    // Cambia la imagen del placeholder a la imagen completa cuando el modal se muestre
    const fullImage = modalBody.querySelector('.modal-image');
    fullImage.onload = () => fullImage.classList.add('loaded'); // Clase para el estilo
    fullImage.src = fullImage.getAttribute('data-full-src');

    // Cierra el modal al hacer clic en el botón de cierre
    document.getElementById('modal-close').onclick = () => modal.style.display = 'none';
};

const lazyLoadImages = () => {
    const lazyImages = document.querySelectorAll('.lazy-load');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy-load');
                observer.unobserve(img);
            }
        });
    }, { rootMargin: '0px', threshold: 0.1 });

    lazyImages.forEach(img => observer.observe(img));
};

// Inicia la carga de agentes al cargar la página
window.onload = fetchAgents;

export {
    fetchAgents,
    displayAgents,
    filterAgents,
    resetFilter,
    showModal
};

// Asignaciones globales para que las funciones puedan ser usadas en otros scripts o HTML
window.filterAgents = filterAgents;
window.resetFilter = resetFilter;
window.showModal = showModal;
