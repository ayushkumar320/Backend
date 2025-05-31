import express from "express";

const app = express();
const port = 3000;

// app.get("/", (req, res) => {
//   res.send("Hello from the express server!");
// });

// app.get("/about", (req, res) => {
//   res.send("Hello this is ayush from backend and this is a server route!");
// });

// app.get("/twitter", (req, res) => {
//   res.send("@notaprocoder is my twitter :)");
// });

app.use(express.json()); // It is a middleware

let teaData = [];
let nextId = 1;

// add a new tea
app.post("/teas", (req, res) => {
  const {name, price} = req.body;
  const newTea = {id: nextId++, name, price};
  teaData.push(newTea);
  res.statusCode = 201;
  res.send(newTea);
});

// get all tea
app.get("/teas", (req, res) => {
  res.statusCode = 200;
  res.send(teaData);
});

// get tea with id
app.get("/teas/:id", (req, res) => {
  const tea = teaData.find((t) => t.id === parseInt(req.params.id)); // parseInt because in request url everything is treated as string.
  if (!tea) {
    res.status(404).send("Error 404 | Tea not found!");
  } else {
    res.status(200).send(tea);
  }
});

// update the tea
app.put("/teas/:id", (req, res) => {
  const tea = teaData.find((t) => t.id === parseInt(req.params.id));
  if (!tea) {
    res.status(404).send("404 | Tea not found!");
  } else {
    const {name, price} = req.body;
    tea.name = name;
    tea.price = price;
    res.status(201).send(tea);
  }
});

// delete tea
app.delete("/teas/:id", (req, res) => {
  const index = teaData.findIndex((t) => t.id === parseInt(req.params.id));
  if (index === -1) {
    res.status(404).send("404 | Tea not found!");
  } else {
    teaData.splice(index, 1);
    res.status(200).send(teaData);
  }
});
app.listen(port, () => {
  console.log(`Server is running at port ${port}...`);
});
