import express from "express";
const port = 8000;
const app = express();

// Basic structure of a middleware
/*
function middlewareFunction(req, res, next) {
    // logic goes here
    next(); // calls the next middleware or route handler
}
*/

// Example 1 - Simple middleware

function loggerMiddleware(req, res, next) {
  // This is a custom middleware GET : /favicon.ico it will return this also to fix this use the below code
  if (req.url === '/favicon.ico') return next();
  console.log(`This is a custom middleware ${req.method} : ${req.url}`);
  next();
}

app.use(loggerMiddleware);

app.get("/", (req, res) => {
  res.send("Hello from server");
});

app.listen(port, () => {
  console.log("Server is running at port 8000");
});
