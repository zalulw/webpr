import Database from "better-sqlite3";

const db = new Database("./data/db.sqlite");

db.prepare('CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY AUTOINCREMENT, title STRING, author STRING)').run();

export const getBooks = () => db.prepare('SELECT * FROM books').all;

export const getBookById = (id) => db.prepare('SELECT * FROM books WHERE id = ?').get(id);

export const saveBook = (title, author) => db.prepare('INSERT INTO books (title, author) VALUES (?, ?)').run(title, author);

export const updateBook = (id, title, author) => db.prepare('UPDATE books SET title = ?, author = ? WHERE id = ?').run(title, author, id);

export const deleteBook = (id) => db.prepare('DELETE FROM books WHERE id = ?').run(id);

const books = getBooks() 
    if(!books.length) {
        saveBook("Bible", "Unknown")
        saveBook("1984", "George Orwell")
        saveBook("The Art of War", "Sun Tzu")
        saveBook("Mein Kampf", "A. Hitler")
    }
