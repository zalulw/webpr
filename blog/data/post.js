import db from "./db.js";

db.prepare(
  `CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER,
    title TEXT,
    content TEXT,
    FOREIGN KEY (userId) REFERENCES users(id))`
).run();

export const getPosts = () => db.prepare("SELECT * FROM posts").all();
export const getPostById = (id) =>
  db.prepare("SELECT * FROM posts WHERE id = ?").get(id);

export const createPost = (userId, title, content) =>
  db
    .prepare("INSERT INTO posts (userId, title, content) VALUES (?, ?, ?)")
    .run(userId, title, content);

export const updatePost = (id, title, content) =>
  db
    .prepare("UPDATE posts SET title = ?, content = ? WHERE id = ?")
    .run(title, content, id);

export const deletePost = (id) =>
  db.prepare("DELETE FROM posts WHERE id = ?").run(id);
