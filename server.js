// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware pour JSON
app.use(express.json());

// Route pour récupérer les catégories
app.get('/categories', (req, res) => {
const filePath = path.join(__dirname, 'data', 'categories.json');    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, 'utf-8');
        res.json(JSON.parse(data));
    } else {
        res.json([]);
    }
});

// Route pour sauvegarder les catégories
app.post('/categories', (req, res) => {
    const filePath = path.join(__dirname, 'categories.json');
    fs.writeFileSync(filePath, JSON.stringify(req.body, null, 2), 'utf-8');
    res.json({ status: 'ok' });
});

// Servir fichiers statiques (ton HTML/JS)
app.use(express.static(__dirname));

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});