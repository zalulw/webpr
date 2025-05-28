import Database from 'better-sqlite3';

const db = new Database('blog.db');

db.exec(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  author_id INTEGER,
  title TEXT,
  category TEXT,
  content TEXT,
  created_at TEXT,
  updated_at TEXT,
  FOREIGN KEY(author_id) REFERENCES users(id)
);
`);

export function getUsers() {
  return db.prepare('SELECT * FROM users').all();
}
export function getUser(id) {
  return db.prepare('SELECT * FROM users WHERE id = ?').get(id);
}

export function getPosts() {
  return db.prepare(`SELECT posts.*, users.name as author FROM posts JOIN users ON posts.author_id = users.id`).all();
}
export function getPost(id) {
  return db.prepare(`SELECT posts.*, users.name as author FROM posts JOIN users ON posts.author_id = users.id WHERE posts.id = ?`).get(id);
}
export function createPost(author_id, title, category, content) {
  const now = new Date().toISOString();
  return db.prepare(`INSERT INTO posts (author_id, title, category, content, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)`)
    .run(author_id, title, category, content, now, now);
}
export function updatePost(id, title, category, content) {
  const now = new Date().toISOString();
  return db.prepare(`UPDATE posts SET title = ?, category = ?, content = ?, updated_at = ? WHERE id = ?`)
    .run(title, category, content, now, id);
}
export function deletePost(id) {
  return db.prepare(`DELETE FROM posts WHERE id = ?`).run(id);
}

if (getUsers().length === 0) {
  db.prepare('INSERT INTO users (name) VALUES (?)').run('Alice');
  db.prepare('INSERT INTO users (name) VALUES (?)').run('Bob');
  db.prepare('INSERT INTO users (name) VALUES (?)').run('Charlie');
}
if (getPosts().length === 0) {
  createPost(1, 'Első poszt', 'Tech', 'Ez az első blogbejegyzés.',);
  createPost(2, 'Második poszt', 'Life', 'Ez a második blogbejegyzés.',);
}