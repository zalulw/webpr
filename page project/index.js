import express from 'express';
import __dirname from './util/rootpath.js';

const index = express();

index.get('/', (req, res) => {
    res.send('works');
});

index.get('/index', (req, res) => {
    res.sendFile('./views/index.html', {root, __dirname})
});


index.listen(3001, () => {
    console.log("server runs on port 3001");
});