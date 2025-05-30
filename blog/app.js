import express from "express";
import * as db from "./util/database.js";
import cors from "cors";

const app = express(); 
app.use(cors()); 

app.use(express.json());

app.get('/users', (req, res) => {
    res.json(db.getUsers());
});

app.get('/posts', (req, res) => {
    res.json(db.getPosts());
});

app.get('/posts/:id', (req, res) => {
    const post = db.getPost(req.params.id);
    if (post) {
        res.json(post);
    } else {
        res.status(404).send('Post not found');
    }
});

app.post('/posts', (req, res) => {
    const { author_id, title, category, content } = req.body;
    if (!author_id || !title || !category || !content) {
        return res.status(400).send('Missing required fields');
    }
    const postId = db.createPost(author_id, title, category, content);
    res.status(201).json({ id: postId });
});

app.put('/posts/:id', (req, res) => {
    const { title, category, content } = req.body;
    if (!title || !category || !content) {
        return res.status(400).send('Missing required fields');
    }
    db.updatePost(req.params.id, title, category, content);
    res.sendStatus(204);
});

app.delete('/posts/:id', (req, res) => {
    db.deletePost(req.params.id);
    res.sendStatus(204);
});

app.listen(8080, () => {
    console.log("Server is running on http://localhost:8080");
});