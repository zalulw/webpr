import express from "express";
import { queryAll, querySingle, executeQuery, initializeDatabase } from "./util/database.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/albums", async (req, res) => {
    const albums = await queryAll("SELECT * FROM albums");
    res.status(200).json(albums);
});

app.post("/albums", async (req, res) => {
    const { band, title, additionalField1, additionalField2 } = req.body;
    if (!band || !title || !additionalField1 || !additionalField2) {
        return res.status(400).json({ message: "Invalid Data!" });
    }
    const result = await executeQuery('INSERT INTO albums(band, title, additionalField1, additionalField2) VALUES (?, ?, ?, ?);', [band, title, additionalField1, additionalField2]);
    res.status(201).json({ id: result.lastID, band, title, additionalField1, additionalField2 });
});

app.get("/albums/:id", async (req, res) => {
    const id = req.params.id;
    const album = await querySingle("SELECT * FROM albums WHERE id = ?;", [id]);
    if (!album) {
        return res.status(404).json({ message: "Album Not Found!" });
    }
    res.status(200).json(album);
});

app.put("/albums/:id", async (req, res) => {
    const id = req.params.id;
    const { band, title, additionalField1, additionalField2 } = req.body;
    if (!band || !title || !additionalField1 || !additionalField2) {
        return res.status(400).json({ message: "Missing data" });
    }
    const result = await executeQuery("UPDATE albums SET band = ?, title = ?, additionalField1 = ?, additionalField2 = ? WHERE id = ?;", [band, title, additionalField1, additionalField2, id]);
    if (result.changes === 0) {
        return res.status(404).json({ message: "Album Not Found!" });
    }
    res.status(200).json({ id, band, title, additionalField1, additionalField2 });
});

app.delete("/albums/:id", async (req, res) => {
    const id = req.params.id;
    const result = await executeQuery("DELETE FROM albums WHERE id = ?;", [id]);
    if (result.changes === 0) {
        return res.status(404).json({ message: "Album Not Found!" });
    }
    res.status(200).json({ message: "Delete successful" });
});

async function startServer() {
    await initializeDatabase();
    app.listen(3000, () => {
        console.log("Server is running on port 3000.");
    });
}

startServer();