import "dotenv/config"; // Only works if you're using "type": "module"
import express from "express";

console.log("Loaded PORT:", process.env.PORT); // Should log 4000

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
