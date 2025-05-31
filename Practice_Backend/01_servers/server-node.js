const http = require("http");

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.statusCode = 200;
    res.setHeader("Content-type", "text/plain");
    res.end("Hello ice tea");
  } else if (req.url === "/about") {
    res.statusCode = 200;
    res.setHeader("Content-type", "text/plain");
    res.end("Hello from ayush");
  } else {
    res.statusCode = 404;
    res.end("Error Code 404");
  }
});

server.listen(port, hostname, () => {
  console.log(`server is listening at port ${port}`);
});
