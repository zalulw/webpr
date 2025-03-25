import express from 'express';
import __dirname from  './util/rootpath.js';

const app = express();


app.get('/', (req, res) => {
    res.sendFile("./views.index.html", {root, __dirname})
});

app.get('/flowers', (req, res) => {
    const flowers = [];
   
 res.send(flowers);
})

app.listen(3010, () => {
    console.log("server runs on port 3000");
});