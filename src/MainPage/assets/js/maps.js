// maps.js
const allMaps = []; // Variable para almacenar todos los mapas

export const fetchMaps = async () => {
    const apiUrl = 'https://valorant-api.com/v1/maps';
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        allMaps.push(...data.data); // Guarda todos los mapas
        await displayMaps(allMaps); // Muestra todos los mapas al inicio
    } catch (error) {
        console.error('Error fetching maps:', error);
    }
};

export const displayMaps = async (maps) => {
    const mapsContainer = document.getElementById('list-maps');
    mapsContainer.innerHTML = '';

    const fragment = document.createDocumentFragment();
    const seenNames = new Set();

    maps.forEach(map => {
        if (seenNames.has(map.displayName) || map.displayName === "Basic Training") {
            return;
        }
        seenNames.add(map.displayName);

        const mapCard = document.createElement('div');
        mapCard.classList.add('map-card');

        const mapImage = document.createElement('img');
        mapImage.dataset.src = map.splash; // Cambia src a data-src para carga diferida
        mapImage.alt = `${map.displayName} splash image`;
        mapImage.classList.add('map-image', 'lazy-load');


        const mapName = document.createElement('h3');
        mapName.textContent = map.displayName;

        mapCard.addEventListener('click', async () => await showMapDetails(map));

        mapCard.appendChild(mapImage);
        mapCard.appendChild(mapName);
        fragment.appendChild(mapCard);
    });

    mapsContainer.appendChild(fragment);
    await initializeLazyLoad();
};


export const showMapDetails = async (map) => {
    const modal = document.getElementById('agentModal');
    const modalBody = document.getElementById('modal-body');
    modal.style.display = 'block';

    modalBody.innerHTML = `
        <div class="modal-content" style="background-image: url('${map.stylizedBackgroundImage}'); background-size: cover; background-position: center;">
            <span class="close-button" id="modal-close">&times;</span>
            <h2>${map.displayName}</h2>
            <div class="banner-container">
                <img src="${map.listViewIcon}" alt="${map.displayName} list view icon" class="banner-image" onerror="this.style.display='none';">
            </div>
            <p>Descripción: ${map.tacticalDescription || 'No disponible'}</p>
            <div class="map-images-container">
                <img src="${map.displayIcon}" alt="${map.displayName} icon" class="modal-image" onerror="this.style.display='none';">
                <img src="${map.listViewIconTall}" alt="${map.displayName} list view icon tall" class="map-list-icon-tall" onerror="this.style.display='none';">
                <img src="${map.premierBackgroundImage}" alt="${map.displayName} premier background" class="map-premier-bg" onerror="this.style.display='none';">
            </div>
        </div>
    `;

    // Se muestra el contenido de las imágenes de manera similar a lo que ya tienes.
    modalBody.querySelector('.map-images-container').style.display = 'flex';
    modalBody.querySelector('.map-images-container').style.flexDirection = 'column';
    modalBody.querySelector('.map-images-container').style.alignItems = 'center';

    const banner = modalBody.querySelector('.banner-container');
    banner.style.display = 'flex';
    banner.style.justifyContent = 'center';
    banner.style.marginBottom = '20px';
    banner.querySelector('.banner-image').style.maxWidth = '100%';
    banner.querySelector('.banner-image').style.borderRadius = '8px';

    document.getElementById('modal-close').addEventListener('click', () => {
        modal.style.display = 'none';
    });
};


// Lazy load images
export const initializeLazyLoad = async () => { // Cambia el nombre de la función aquí
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

export const closeModal = () => {
    const modal = document.getElementById('agentModal');
    modal.style.display = 'none';
};

window.addEventListener('click', (event) => {
    const modal = document.getElementById('agentModal');
    if (event.target === modal) {
        closeModal();
    }
});

// Cargar los mapas al cargar la página
document.addEventListener('DOMContentLoaded', async () => {
    await fetchMaps();
});
