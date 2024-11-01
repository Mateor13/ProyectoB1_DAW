import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Configuración del módulo
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, './MainPage')));

// Ruta principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './MainPage/index.html'));
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
