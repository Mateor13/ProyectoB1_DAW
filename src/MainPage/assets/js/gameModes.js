// Función para obtener y mostrar los modos de juego
export async function fetchGameModes() {
    try {
        const response = await fetch('https://valorant-api.com/v1/gamemodes?language=es-ES');
        const data = await response.json();

        // Verificamos que la respuesta tenga datos
        if (data.status === 200) {
            data.data.forEach(gameMode => {
                // Excluir modos de juego "Entrenamiento Básico" y "Tutorial"
                if (gameMode.displayName !== "Entrenamiento Básico" && gameMode.displayName !== "Tutorial") {
                    displayGameMode(gameMode);
                }
            });
        } else {
            console.error('Error en la respuesta de la API:', data);
        }
    } catch (error) {
        console.error('Error al hacer la solicitud:', error);
    }
}

// Función para mostrar cada modo de juego en el div correspondiente
function displayGameMode(gameMode) {
    const gameModesDiv = document.getElementById("GameModes");

    // Crear un contenedor para cada modo de juego
    const modeContainer = document.createElement("div");
    modeContainer.className = "game-mode";

    let modeContent = `<h3>${gameMode.displayName}</h3>`;

    // Verificar cada propiedad antes de agregarla al contenido de la tarjeta
    if (gameMode.description !== null) {
        modeContent += `<p><strong>Descripción:</strong> ${gameMode.description}</p>`;
    }
    if (gameMode.duration !== null) {
        modeContent += `<p><strong>Duración:</strong> ${gameMode.duration}</p>`;
    }
    if (gameMode.allowsMatchTimeouts !== null) {
        modeContent += `<p><strong>Permite Tiempos de Partida:</strong> ${gameMode.allowsMatchTimeouts ? 'Sí' : 'No'}</p>`;
    }
    if (gameMode.isTeamVoiceAllowed !== null) {
        modeContent += `<p><strong>Voz en Equipo Permitida:</strong> ${gameMode.isTeamVoiceAllowed ? 'Sí' : 'No'}</p>`;
    }
    if (gameMode.orbCount !== null) {
        modeContent += `<p><strong>Cantidad de Orbes:</strong> ${gameMode.orbCount}</p>`;
    }

    // Agregar la imagen si existe
    if (gameMode.displayIcon) {
        modeContent += `<img src="${gameMode.displayIcon}" alt="${gameMode.displayName} Icon" />`;
    }

    // Asignar el contenido generado al contenedor de modo de juego
    modeContainer.innerHTML = modeContent;

    // Agregar el contenedor al div principal
    gameModesDiv.appendChild(modeContainer);
}

