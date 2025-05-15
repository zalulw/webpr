import Database from 'better-sqlite3';

const db = new Database('./data/database.sqlite3')

db.prepare(`CREATE TABLE IF NOT EXISTS users 
    (id INTEGER PRIMARY KEY AUTOINCREMENT, 
    name STRING, age INTEGER)`).run()
export const getUsers = () => db.prepare(`SELECT * FROM users`).all()

export const getUser = (id) => db.prepare(`SELECT * FROM users WHERE id = ?`).get(id)

export const saveUser = (name, age) => db.prepare(`INSERT INTO users (name, age) VALUES (?, ?)`).run(name, age)

export const updateUser = (id, name, age) => db.prepare(`UPDATE uusers SET name = ?, age = ? WHERE id = ?`).run(name,age,id)

export const deleteUser = (id) => db.prepare(`DELETE FROM users WHERE id = ?`).run(id)

const users = [
    {name: 'mate', age:18}, {name: 'bela', age:20}, {name: 'csoke', age:5}
]

//for (const user of users) saveUser(user.name, user.age)