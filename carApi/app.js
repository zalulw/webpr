import express from "express";

const PORT = 6000;
const app = express();
app.use(express.json());

const cars = [
  { id: 1, brand: "bmw", model: "E36" },
  { id: 2, brand: "toyota", model: "supra mk4" },
  { id: 3, brand: "honda", model: "civic ej2" },
  { id: 4, brand: "mitsubishi", model: "lancer evo" },
];

//getall
app.get("/cars", (req, res) => {
  res.status(200).json(cars);
});

//getbyid
app.get("/cars/:id", (req, res) => {
  const id = +req.params.id;
  const car = cars.find((cars) => cars.id === id);

  if (!car) {
    res.status(404).json({ message: "car not found" });
  }
  res.status(200).json(car);
});

//post
app.post("/cars", (req, res) => {
  const { brand, model } = req.body;
  if (!brand || !model) {
    return res.status(400).json({
      status: "fail",
      message: "Brand and model are required",
      errorLocation: "POST /cars - missing brand or model in request body",
    });
  }
  const id = cars.length ? cars[cars.length - 1].id + 1 : 1;
  const car = { id, brand, model };
  cars.push(car);
  res.status(200).json(car);
});

//put
app.put("/cars/:id", (req, res) => {
  const id = parseInt(req.params.id);
  let car = cars.find((car) => car.id === id);
  if (!car) {
    res.status(404).json({ message: "car not found" });
  }
  const index = cars.indexOf(car);
  const { brand, model } = req.body;
  car = {
    id: car.id,
    brand: brand,
    model: model,
  };
  cars[index] = car;
  res.status(200).json(car);
});

//delete
app.delete("/cars/:id", (req, res) => {
  const id = +req.params.id;
  const car = cars.find((car) => car.id === id);
  if (!car) {
    res.status(404).json({ message: "car not found" });
  }

  const index = cars.indexOf(car);
  cars.split(index, 1);
  res.status(200).json({ messaage: "delete successful" });
});

app.listen(PORT, () => {
  console.log(`Server runs on http://localhost:${PORT}`);
});
