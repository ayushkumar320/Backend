import express from "express";

const app = express();
const port = 3000;

// app.get("/", (req, res) => {
//   res.send("Hello from Ayush and his server");
// });

// app.get("/ice-tea", (req, res) => {
//   res.send("What ice tea would you prefer?");
// });

// app.get("/twitter", (req, res) => {
//   res.send("notaprocoder");
// });

/* 
  app.use(express.json()); tells Express to automatically parse incoming JSON data from   the request body.

  Meaning:
  When a client (like Postman, frontend app, etc.) sends a POST, PUT, or PATCH request with a JSON body, Express normally doesn't understand it automatically.
  express.json() is middleware that reads that raw JSON data and converts it into a JavaScript object you can easily access via req.body. */
app.use(express.json());


let teaData = [];
let nextId = 1;

// Adding the tea - post
app.post("/teas", (req, res) => {
  const {name, price} = req.body;
  // Anything comes under body (generally POST JSON) we use req.body to access it.
  // Destructuring it or it is equivalent to const name = req.body.name; or const price = req.body.price;
  const newTea = {id: nextId++, name, price};
  teaData.push(newTea);
  res.status(201).send(newTea);
});

// Getting all tea - get
app.get("/teas", (req, res) => {
  res.status(200).send(teaData);
});

// Getting a tea with id - get/:id
app.get("/teas/:id", (req, res) => {
  const tea = teaData.find((t) => {
    // params - anything that comes from the url and it comes as a string format, so we need to parse it to int.

    // t.id === Number(req.params.id);

    t.id === parseInt(req.params.id);

    /* 
      Both would work for your current use case where you expect the id to be an integer from the URL.
      However, here’s the main difference:

      Number() converts the whole value into a number. It will fail and give NaN if the value is not a valid number.

      parseInt() reads the first part of the string until it finds something invalid. So "42abc" would become 42 using parseInt("42abc"), but Number("42abc") would give NaN.
    */
  });

  if (!tea) {
    return res.status(404).send("Tea not found!");
  } else {
    res.status(200).send(tea);
  }
});

// Update the tea


app.listen(port, () => {
  console.log(`Server is running at port ${port}...`);
});
