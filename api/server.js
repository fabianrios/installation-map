import express from 'express';
import fs from 'fs/promises';
import cors from 'cors';
import { WebSocketServer } from 'ws';
import jwt from 'jsonwebtoken';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 5001;
const JWT_SECRET = process.env.JWT_SECRET || 'super_toxic_me';

// Setup paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images')));

// Load data
let data = [];
async function loadData() {
    const file = await fs.readFile('cases.json', 'utf-8');
    data = JSON.parse(file);
}
await loadData();

// AUTH endpoint — validate answer and issue token
const validAnswers = ["lemwerder", "cali, la linterna"];

app.post('/auth', (req, res) => {
    const { answer } = req.body;

    if (!answer || !validAnswers.includes(answer.trim().toLowerCase())) {
        return res.status(401).json({ error: "Invalid answer" });
    }

    const token = jwt.sign({}, JWT_SECRET, { expiresIn: '30m' });
    res.json({ token });
});

// Middleware to protect focus
function verifyToken(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];

    if (token === 'toxicris') {
        return next();  // Always allow master token
    }

    if (!token) return res.status(401).json({ error: "Missing token" });

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ error: "Invalid or expired token" });
        next();
    });
}

// Data endpoints
app.get('/cases', (req, res) => {
    const published = data.filter(c => c.publicado !== false);
    res.json(published);
});

app.get('/cases/:id', (req, res) => {
    const caseId = parseInt(req.params.id, 10);
    const mural = data.find(c => c.id === caseId);
    if (!mural) return res.status(404).json({ error: 'Case not found' });
    res.json(mural);
});

// Focus endpoint protected by token
let currentFocus = null;
const wsClients = new Set();

app.post('/focus', verifyToken, (req, res) => {
    currentFocus = { ...req.body, timestamp: Date.now() };
    console.log('New focus:', currentFocus);

    wsClients.forEach(ws => ws.send(JSON.stringify(currentFocus)));
    res.json({ status: 'ok' });
});

// Start server + WebSocket
const server = app.listen(PORT, () => {
    console.log(`API running at port: ${PORT}`);
});

const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
    console.log('WS client connected');
    wsClients.add(ws);
    ws.on('close', () => wsClients.delete(ws));
});
