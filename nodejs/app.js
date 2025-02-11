import express from 'express';
import _dirname from './util.rootpath.js';

const app = express();

app.get("/", (req, res) => {
    res.send("Hello cigany");
});

app.get("/index", req, res => {
    res.sendFile("./views.index.html", {root, _dirname})
});

app.listen(5800, () => {
    console.log('Server runs on port 5800');
}); //port beallitasa
