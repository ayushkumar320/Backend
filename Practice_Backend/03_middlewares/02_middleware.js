// Example 2: Middleware to Add Data to Request

import express from "express";
const app = express();
const port = 8080;

function addUserToRequest(req, res, next) {
  req.user = {name: "Ayush", role: "Admin"};
  console.log("Middleware getting used!");
  next();
}

app.use(addUserToRequest);
app.get("/dashboard", (req, res) => {
  res.send(`Hello ${req.user.name}, your role is ${req.user.role}`);
});

app.listen(port, () => {
  console.log(`Server is listening to port ${port}`);
});
