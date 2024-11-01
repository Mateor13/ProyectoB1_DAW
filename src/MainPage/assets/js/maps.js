let allMaps = []; // Almacenamos todos los mapas

const fetchMaps = async () => {
    try {
        const response = await fetch('https://valorant-api.com/v1/maps');
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        
        const data = await response.json();
        allMaps = data.data;
        displayMaps(allMaps); // Muestra todos los mapas al inicio
    } catch (error) {
        console.error('Error fetching maps:', error);
    }
};

const displayMaps = (maps) => {
    const mapsContainer = document.getElementById('list-maps');
    mapsContainer.innerHTML = '';

    const fragment = document.createDocumentFragment();
    const seenNames = new Set();

    maps.forEach(map => {
        if (seenNames.has(map.displayName) || map.displayName === "Basic Training") return;
        seenNames.add(map.displayName);

        const mapCard = document.createElement('div');
        mapCard.classList.add('map-card');
        mapCard.innerHTML = `
            <img data-src="${map.splash}" alt="${map.displayName} splash image" class="map-image lazy-load">
            <h3>${map.displayName}</h3>
        `;

        mapCard.addEventListener('click', () => showMapDetails(map));
        fragment.appendChild(mapCard);
    });

    mapsContainer.appendChild(fragment);
    initializeLazyLoad(); // Configura carga diferida de imágenes
};

const showMapDetails = (map) => {
    const modal = document.getElementById('agentModal');
    const modalBody = document.getElementById('modal-body');
    modal.style.display = 'block';

    modalBody.innerHTML = `
        <div class="modal-content" style="background-image: url('${map.stylizedBackgroundImage}'); background-size: cover; background-position: center;">
            <span class="close-button" id="modal-close">&times;</span>
            <h2>${map.displayName}</h2>
            <div class="banner-container">
                <img data-src="${map.listViewIcon}" alt="${map.displayName} list view icon" class="banner-image lazy-modal-load" onerror="this.style.display='none';">
            </div>
            <p>Descripción: ${map.tacticalDescription || 'No disponible'}</p>
            <div class="map-images-container">
                ${['displayIcon', 'listViewIconTall', 'premierBackgroundImage'].map(img => 
                    map[img] ? `<img data-src="${map[img]}" alt="${map.displayName} ${img}" class="map-image lazy-modal-load" onerror="this.style.display='none';">` : ''
                ).join('')}
            </div>
        </div>
    `;

    const modalCloseButton = document.getElementById('modal-close');
    modalCloseButton.onclick = closeModal;

    // Inicializa lazy loading para las imágenes del modal
    initializeLazyLoadModal();
};

const initializeLazyLoad = () => { 
    const lazyImages = document.querySelectorAll('.lazy-load');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src; // Carga la imagen
                img.classList.remove('lazy-load'); // Elimina la clase de carga diferida
                observer.unobserve(img); // Deja de observar esta imagen
            }
        });
    }, { rootMargin: '0px', threshold: 0.1 });

    lazyImages.forEach(img => observer.observe(img));
};

// Lazy loading para las imágenes del modal
const initializeLazyLoadModal = () => {
    const lazyModalImages = document.querySelectorAll('.lazy-modal-load');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src; // Carga la imagen
                img.classList.remove('lazy-modal-load'); // Elimina la clase de carga diferida
                observer.unobserve(img); // Deja de observar esta imagen
            }
        });
    }, { rootMargin: '0px', threshold: 0.1 });

    lazyModalImages.forEach(img => observer.observe(img));
};

// Pre-carga de imágenes para mejorar el rendimiento al abrir el modal
const preloadImage = (url) => {
    const img = new Image();
    img.src = url;
};

// Pre-cargar imágenes importantes al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    fetchMaps().then(() => {
        allMaps.forEach(map => {
            if (map.stylizedBackgroundImage) preloadImage(map.stylizedBackgroundImage);
            if (map.displayIcon) preloadImage(map.displayIcon);
            if (map.listViewIcon) preloadImage(map.listViewIcon);
        });
    });
});

const closeModal = () => {
    const modal = document.getElementById('agentModal');
    modal.style.display = 'none';
};

// Cierra el modal al hacer clic fuera de él
window.addEventListener('click', (event) => {
    if (event.target === document.getElementById('agentModal')) closeModal();
});

export {
    fetchMaps
};
