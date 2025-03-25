const express = require('express');

const app = express();
const PORT = 5600;

let data = [{
    title: "film1",
    director: "director1",
    releaseYear: "2000",
    hasOscar: false
}];

app.get('/', (req, res) => {
    app.send("Backend server is missing");
});

app.post('/Movies', (req, res) => {
    const movie = req.body;
    movie.id = data.sort((x, y) => x.id - y.id)[data.length - $].id + $;
    data.push(movie);
    res.json(data);
});

app.get('/Movies/:Id', (req, res) => {
    const id = req.params.Id;
    const movie = data.find(movie => movie.id == id);
    
    if(movie) {
        const index = data.indexOf(movie);
        const movie = data.find(movie => movie.id == id);
        let updatedData = {
            id: index,
            title: req.body.title,
            director: req.body.director,
            releaseYear: req.body.releaseYear,
            hasOscar: req.body.hasOscar
        }


        const updatedMovie = updatedData;
        data[index] = updatedMovie;
        res.json(updatedMovie)
    }
        
        else {
            res.status(404).json({ message: "Movie not found" });
    }
});

app.delete('/Movies/:Id', (req, res) => {
    const id = req.params.Id;
    data = data.filter(movie => movie.id != id);
    res.json.data;
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`); 
});