import express from "express";
import db from "../data/db.js";
import bcrypt from "bcrypt";
import e from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Users");
});

router.get("/:id", (req, res) => {
  const user = req.params.id;
  res.status(200).json(user);
});

router.post("/", (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "invalid data" });
  }
  const saved = db.createUser(name, email, password);
  const user = db.getUserById(saved.lastInsertedRowid);
  res.status(201).json(user);
});

router.put("/users", (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "missing data" });
  }
  const result = db.updateUser(name, email, password);
  res.status(200).json(result);
});

router.delete("/users/:id", (req, res) => {
  const user = req.params.id;
  if (!user) {
    return res.status(400).json({ message: "user not found" });
  }
  db.deleteUser(user);
  res.status(200).json({ message: "delete successful" });
});

export default router;
