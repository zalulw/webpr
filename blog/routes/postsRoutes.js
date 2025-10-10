import { Router } from "express";
import db from "../data/db.js";

const router = Router();

router.get("/", (req, res) => {
  res.send("Posts");
});

router.get("/posts/:id", (req, res) => {
  const post = req.params.id;
  res.status(200).json(post);
});

router.post("/posts", (req, res) => {
  const { title, content, userId } = req.body;
  if (!title || !content || !userId) {
    return res.status(400).json({ message: "invalid data" });
  }
  const saved = db.createPost(title, content, userId);
  const post = db.getPostById(saved.lastInsertedRowid);
  res.status(201).json(post);
});

router.put("/:id", (req, res) => {
  const { title, content } = req.body;
  const { id } = req.params;
  if (!title || !content) {
    return res.status(400).json({ message: "missing data" });
  }
  const result = db.updatePost(id, title, content);
  res.status(200).json(result);
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.deletePost(id);
  res.status(200).json({ message: "delete successful" });
});

export default router;
