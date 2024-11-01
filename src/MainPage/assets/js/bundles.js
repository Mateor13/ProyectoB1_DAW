async function fetchValorantBundles() {
    try {
        const response = await fetch('https://valorant-api.com/v1/bundles');
        
        // Verifica si la respuesta es correcta (status 200)
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        
        // Convierte la respuesta en formato JSON
        const data = await response.json();
        
        // Procesa los datos
        displayBundles(data.data);
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

// Función para mostrar los datos en la interfaz
function displayBundles(bundles) {
    const container = document.getElementById('bundles-container'); 
    bundles.forEach(bundle => {
        // Crea un elemento para el bundle
        const bundleDiv = document.createElement('div');
        bundleDiv.classList.add('bundle-card'); 
        
        // Agrega contenido al div
        bundleDiv.innerHTML = `
            <h3>${bundle.displayName}</h3>
            <p>${bundle.description}</p>
            <img src="${bundle.displayIcon}" alt="${bundle.displayName} icon" />
        `;

        // Añade el div al contenedor
        container.appendChild(bundleDiv);
    });
}


export {fetchValorantBundles};