import express from 'express';
import fs from 'fs/promises';
import cors from 'cors';
import { WebSocketServer } from 'ws';

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

let data = [];

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

app.post('/focus', (req, res) => {
    currentFocus = { ...req.body, timestamp: Date.now() };
    console.log('New focus:', currentFocus);

    wsClients.forEach(ws => {
        ws.send(JSON.stringify(currentFocus));
    });

    res.json({ status: 'ok' });
});

const server = app.listen(PORT,'192.168.178.178', () => {
    console.log(`API running at http://192.168.178.178':${PORT}`);
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
