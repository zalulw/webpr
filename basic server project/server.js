import express from 'express';
import _dirname from './util.rootpath.js';

const server = express();

server.get('/', (req, res) => {
    res.send("Hello udvozollek a weboldalamon")
})



server.listen(3003, () => {
    console.log('server runs on port 3003')
});