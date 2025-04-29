import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./data/database.sqlite");

export const queryAll = (sql, params = []) => 
    new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            err ? reject(err) : resolve(rows);
        });
    });

export const querySingle = (sql, params = []) => 
    new Promise((resolve, reject) => {
        db.get(sql, params, (err, row) => {
            err ? reject(err) : resolve(row);
        });
    });

export const executeQuery = (sql, params = []) => 
    new Promise((resolve, reject) => {
        db.run(sql, params, function (err) {
            err ? reject(err) : resolve(this);
        });
    });

export const initializeDatabase = async () => {
    try {
        // Example: Create a table if it doesn't exist
        await executeQuery(`
            CREATE TABLE IF NOT EXISTS classes (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                day INTEGER NOT NULL,
                time INTEGER NOT NULL
            );
        `);
        console.log("Database initialized successfully.");
    } catch (error) {
        console.error("Error initializing database:", error);
        throw error;
    }
};