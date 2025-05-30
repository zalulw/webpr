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
    await executeQuery("DROP TABLE IF EXISTS albums");
    await executeQuery(`
        CREATE TABLE IF NOT EXISTS albums (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            band TEXT, 
            title TEXT, 
            genre TEXT, 
            release_year INTEGER
        );
    `);

    const initialAlbums = []; 
        for (const album of initialAlbums) {
        await executeQuery(
            "INSERT INTO albums (band, title, genre, release_year) VALUES (?, ?, ?, ?);", 
            [album.band, album.title, album.genre, album.release_year]
        );
    }
};