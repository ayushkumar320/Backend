//  Example 3: Route-specific Middleware
import express from "express";

const port = 3000;
const app = express();

function authMiddleWare(req, res, next) {
  const isAuthorised = false;
  console.log("Middlware in action!");
  if (isAuthorised) {
    next();
  } else {
    res.status(404).send("Error 404 | User not authorized!");
  }
}

app.get("/protected", authMiddleWare, (req, res) => {
  res.send("Welcome to protected route");
});

app.listen(port, () => {
  console.log("Server is running at port 3000...");
});
