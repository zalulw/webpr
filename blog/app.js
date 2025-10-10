import express from "express";
import cors from "cors";
import postRoutes from "./routes/postsRoutes.js";
import userRoutes from "./routes/usersRoutes.js";
import bcrypt from "bcrypt";
import { updateUser } from "./data/user.js";
import * as db from "./data/db.js";

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(cors());

app.use("/posts", postRoutes);
app.use("/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server runs on port ${PORT}`);
});
