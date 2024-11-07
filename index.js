import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Configuración del módulo
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Servir archivos estáticos
app.use('/', express.static(path.join(__dirname, './src/Login')));
app.use('/Inicio', express.static(path.join(__dirname, './src/MainPage')));

// Ruta principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './src/Login/login.html'));
});
app.get('/Inicio', (req, res) => {
    res.sendFile(path.join(__dirname, './src/MainPage/index.html'));
});
// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
