import express from "express";
import { dbAll, initializeDatabse, dbGet, dbRun} from "./util/database.js";
import cors from "cors";

const app = express()
app.use(express.json())

app.use(cors())

app.get("/classes", async (req, res) =>
{
    const classes = await dbAll("SELECT * FROM classes");
    res.status(200).json(classes)
})

app.post("/classes", async (req, res) => {
    const {name, day, time} = req.body;
    if(!name || !day || !time)
    {
        return res.status(404).json({message : "Invalid Data!"})
    }
    const result = await dbRun('INSERT INTO classes(name, day, time) VALUES (?, ?, ?);', [name, day, time]);

    res.status(201).json({id : result.lastID, name, day, time});
})

app.put('/classes/:id', async (req, res) =>
{
    const id = req.params.id;
    const hour = await dbGet("SELECT * FROM classes WHERE id = ?;", [id])
    if(!hour)
    {
        return res.status(404).json({message : "Hour Not Found!"})
    }
    const {name, day, time} = req.body;
    if(!name || !day || !time)
        {
            return res.status(404).json({message : "Missing data"})
        }
    dbRun("UPDATE classes SET name = ?, day = ?, time = ?  WHERE id = ?;", [name, day, time, id])
    res.status(200).json({id, name, day, time})
})

app.delete('/classes/:id', async (req, res) =>
{
    const id = req.params.id;
    const hour = await dbGet("SELECT * FROM classes WHERE id = ?;", [id])
    if(!hour)
    {
        return res.status(404).json({message : "Hour Not Found!"})
    }
    dbRun("DELETE FROM classes WHERE id = ?;", [id])
    res.status(200).json({message: "Delete successful"})
})

/*app.use((req, res, next, err) => {
    if(err)
    {
        res.status(500).json({message : `Error : ${err.message}`});
    }
})*/ 

async function startServer() {
    await initializeDatabse()
    app.listen(3000, ()=> {
        console.log("Server is running.")
    })
}

startServer()