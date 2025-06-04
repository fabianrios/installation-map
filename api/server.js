import express from 'express';
import fs from 'fs/promises';
import cors from 'cors';
import { WebSocketServer } from 'ws';

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

import os from 'os';

const getLocalIPAddress = () => {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name]) {
            if (iface.family === 'IPv4' && !iface.internal) {
                return iface.address;
            }
        }
    }
    return '127.0.0.1'; // Fallback to localhost
};

let data = [];

import path from 'path';
import { fileURLToPath } from 'url';

// Esto es para resolver __dirname correctamente en ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Sirve la carpeta de imágenes:
app.use('/images', express.static(path.join(__dirname, 'images')));

async function loadData() {
    const file = await fs.readFile('cases.json', 'utf-8');
    data = JSON.parse(file);
}
await loadData();

let currentFocus = null;
const wsClients = new Set();

app.get('/cases', (req, res) => {
    const published = data.filter(c => c.publicado !== false);
    res.json(published);
});

// make /cases/id return a single case
app.get('/cases/:id', (req, res) => {
    const caseId = parseInt(req.params.id, 10);
    const mural = data.find(c => c.id === caseId);
    if (!mural) {
        return res.status(404).json({ error: 'Case not found' });
    }
    res.json(mural);
});

app.post('/focus', (req, res) => {
    currentFocus = { ...req.body, timestamp: Date.now() };
    console.log('New focus:', currentFocus);

    wsClients.forEach(ws => {
        ws.send(JSON.stringify(currentFocus));
    });

    res.json({ status: 'ok' });
});

const server = app.listen(PORT, getLocalIPAddress(), () => {
    console.log(`API running at http://${getLocalIPAddress()}:${PORT}`);
});

// WebSocket server
const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
    console.log('WS client connected');
    wsClients.add(ws);

    ws.on('close', () => {
        wsClients.delete(ws);
    });
});
