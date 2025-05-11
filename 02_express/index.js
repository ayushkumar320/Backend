// This package is used when deployment (it required the .env file), because when we deploy, we can not use random ports like 3000, 2000 because of security issues, this package will look for a .env file in your directory, we define port in this env file or API_KEY
import "dotenv/config";

import express from "express";
import logger from "./logger.js";
import morgan from "morgan";

const app = express();
// const port = 3000; not used in deployment stage
const port = process.env.PORT || 3000;

// app.get("/", (req, res) => {
//   res.send("Hello from Ayush and his server");
// });

// app.get("/ice-tea", (req, res) => {
//   res.send("What ice tea would you prefer?");
// });

// app.get("/twitter", (req, res) => {
//   res.send("notaprocoder");
// });

// Another way to get the routes done is as follows:
/*
app.route('/book')
  .get(function (req, res) {
    res.send('Get a random book')
  })
  .post(function (req, res) {
    res.send('Add a book')
  })
  .put(function (req, res) {
    res.send('Update the book')
  });
*/

/* 
  app.use(express.json()); tells Express to automatically parse incoming JSON data from the request body. It is a middleware

  Meaning:
  When a client (like Postman, frontend app, etc.) sends a POST, PUT, or PATCH request with a JSON body, Express normally doesn't understand it automatically.
  express.json() is middleware that reads that raw JSON data and converts it into a JavaScript object you can easily access via req.body. 
*/

app.use(express.json());

// Using the morgan
const morganFormat = ":method :url :status :response-time ms";
// Using the morgan middleware, after the express app is made
app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);
let teaData = [];
let nextId = 1;

// Adding the tea - post
app.post("/teas", (req, res) => {
  // Anything comes under body (generally POST JSON) we use req.body to access it.
  // Destructuring it or it is equivalent to const name = req.body.name; or const price = req.body.price;
  const {name, price} = req.body;
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

    return t.id === parseInt(req.params.id);

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
app.put("/teas/:id", (req, res) => {
  const teaId = parseInt(req.params.id);
  const tea = teaData.find((t) => {
    return t.id === teaId;
  });
  if (!tea) {
    res.status(404).send("404 | Tea not found!");
  } else {
    const {name, price} = req.body;
    tea.name = name;
    tea.price = price;
    res.status(200).send(tea);
  }
});

// Delete Tea
app.delete("/teas/:id", (req, res) => {
  const index = teaData.findIndex((t) => {
    return t.id === parseInt(req.params.id);
  });
  if (index === -1) {
    req.status(404).send("Tea Not Found!");
  } else {
    teaData.splice(index, 1);
    res.status(204).send();
  }
});

app.listen(port, () => {
  console.log(`Server is running at port ${port}...`);
});
