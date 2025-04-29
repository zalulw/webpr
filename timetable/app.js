import express from "express";
import { queryAll, initializeDatabase, querySingle, executeQuery} from "./util/database.js";
import cors from "cors";

const app = express()
app.use(express.json())

app.use(cors())

app.get("/classes", async (req, res) =>
{
    const classes = await queryAll("SELECT * FROM classes");
    res.status(200).json(classes)
})

app.post("/classes", async (req, res) => {
    const {name, day, time} = req.body;
    if(!name || !day || !time)
    {
        return res.status(404).json({message : "Invalid Data!"})
    }
    const result = await executeQuery('INSERT INTO classes(name, day, time) VALUES (?, ?, ?);', [name, day, time]);

    res.status(201).json({id : result.lastID, name, day, time});
})

app.put('/classes/:id', async (req, res) =>
{
    const id = req.params.id;
    const hour = await querySingle("SELECT * FROM classes WHERE id = ?;", [id])
    if(!hour)
    {
        return res.status(404).json({message : "Hour Not Found!"})
    }
    const {name, day, time} = req.body;
    if(!name || !day || !time)
        {
            return res.status(404).json({message : "Missing data"})
        }
    executeQuery("UPDATE classes SET name = ?, day = ?, time = ?  WHERE id = ?;", [name, day, time, id])
    res.status(200).json({id, name, day, time})
})

app.delete('/classes/:id', async (req, res) =>
{
    const id = req.params.id;
    const hour = await querySingle("SELECT * FROM classes WHERE id = ?;", [id])
    if(!hour)
    {
        return res.status(404).json({message : "Hour Not Found!"})
    }
    executeQuery("DELETE FROM classes WHERE id = ?;", [id])
    res.status(200).json({message: "Delete successful"})
})

const startServer = async () => {
    try {
        await initializeDatabase(); // Correct function name
        app.listen(3000, () => {
            console.log("Server is running on http://localhost:3000");
        });
    } catch (error) {
        console.error("Failed to start server:", error);
    }
};

startServer()
