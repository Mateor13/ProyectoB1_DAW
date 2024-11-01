let allWeapons = []; // Almacenamos todas las armas

const fetchWeapons = async () => {
    try {
        const response = await fetch('https://valorant-api.com/v1/weapons');
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        
        const data = await response.json();
        allWeapons = data.data;
        displayWeapons(allWeapons); 
    } catch (error) {
        console.error('Error fetching weapons:', error);
        alert('No se pudieron cargar las armas. Por favor, intenta nuevamente más tarde.'); // Notificación al usuario
    }
};

const displayWeapons = (weapons) => {
    const weaponsContainer = document.getElementById('list-weapons');
    weaponsContainer.innerHTML = '';

    const fragment = document.createDocumentFragment();

    weapons.forEach(weapon => {
        const weaponCard = document.createElement('div');
        weaponCard.classList.add('weapon-card');
        weaponCard.innerHTML = `
            <img data-src="${weapon.displayIcon}" alt="${weapon.displayName} icon" class="weapon-image lazy-load">
            <h3>${weapon.displayName}</h3>
            <p>Categoría: ${weapon.category.replace('EEquippableCategory::', '')}</p>
            <p>Costo: ${weapon.shopData?.cost ?? 'Gratis'}</p>
        `;

        weaponCard.addEventListener('click', () => showWeaponDetails(weapon));
        fragment.appendChild(weaponCard);
    });

    weaponsContainer.appendChild(fragment);
    initializeLazyLoad(); 
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


// Pre-cargar imágenes importantes al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    fetchWeapons().then(() => {
        allWeapons.forEach(weapon => {
            if (weapon.displayIcon) preloadImage(weapon.displayIcon);
        });
    });
});

const preloadImage = (url) => {
    const img = new Image();
    img.src = url;
};

export {
    fetchWeapons
};
