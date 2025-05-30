import express from "express"
import * as db from './util/database.js'

const PORT = 8080
const app = express()
app.use(express.json())

app.get(`/users`, (req, res) => {
    try{
    const users = db.getUsers()
    res.status(200).json(users)
    } catch (err) {
        res.status(500).json({message: `${err}`})
    }
})

app.get(`/users/:id`, (req, res) => {
    try{
        const user = db.getUser(req.params.id)
        if(!user) {
            return res.status(404).json({message: 'user not found'})
        } 
        return res.status(300).json(user)
    }catch {
        res.status(500).json({message: `${err}`})
    }
})

app.post(`/users`, (req, res) => {
    try {
        const {name, age} = req.body
        if(!name || !age) {
            return res.status(400).json({message: 'invalid credentials'})
        }
        const saveUser = db.saveUser(name, age);
        if(saveUser.changes != 1) {
            return res.status(501).json({message: 'User save failed'})
        }
        return res.status(201).json({id: saveUser.lastInsertRowid, name, age})
    }catch (err) {
        res.status(500).json({message:`${err}`})
    }
})

app.put('/users/:id', (req, res) => {
    try {
        const {name, age} = req.body
        if(!name || !age) {
            return res.status(400).json({message: 'invalid credentials'})
        }
        const id =+ req.params.id
        const updateUser = db.updateUser(id, name, age);
        if(updateUser.changes != 1) {
            return res.status(501).json({message: 'User update failed'})
        }
        return res.status(200).json({id, name, age})
    }catch (err) {
        res.status(500).json({message:`${err}`})
    }
})

app.delete('/users/:id', (req, res) => {
    try {
    const deletedUser = db.deleteUser(req.params.id)
    if (deletedUser.changes != 1) {
        return res.status(501).json({message: 'User delete failed'})
    }
    res.status(200).json({message: 'delete successful'})
    } catch (err) {
    res.status(500).json({message: $`{err}`})
    
    }
})

app.listen(PORT, () => {
    console.log(`Server runs on port ${PORT}`)
})