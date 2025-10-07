import express from "express";
import cors from "cors";
import postRoutes from "./routes/postsRoutes.js";
import userRoutes from "./routes/usersRoutes.js";
import bcrypt from "bcrypt";
import { updateUser } from "./data/user.js";

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(cors());

app.use("/posts", postRoutes);
app.use("/users", userRoutes);

app.get("/users/:id", (req, res) => {
  const user = res.params.id;
  res.status(200).json(user);
});

app.post("/users", (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({
      message: "invalid credentials",
    });
  }
  const salt = bcrypt.genSaltSync(12);
  const hashedPass = bcrypt.hashSync(password, salt);
  const saved = db.createUser(name, email, hashedPass);
  const user = db.getUserById(saved.lastInsertedRowid);
  res.status(201).json(user);
});

app.put("/users", (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "missing data" });
  }
  const result = db.updateUser(name, email, password);
  res.status(200).json(result);
});

app.delete("/users/:id", (req, res) => {
  const user = req.params.id;
  if (!user) {
    res.status(404).json({ message: "user not found" });
  }
  db.deleteUser(user);
  res.status(200).json({ message: "delete successful" });
});

app.listen(PORT, () => {
  console.log(`Server runs on port ${PORT}`);
});
