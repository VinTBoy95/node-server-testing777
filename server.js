const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {

  if (req.method === "GET" && req.url === "/") {
    const filePath = path.join(__dirname, "index.html");

    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.error(err);
        res.writeHead(500);
        res.end("Could not load index.html");
        return;
      }

      res.writeHead(200, {
        "Content-Type": "text/html; charset=utf-8"
      });

      res.end(data);
    });

    return;
  }

  if (req.method === "POST" && req.url === "/message") {
    let body = "";

    req.on("data", chunk => {
      body += chunk.toString();
    });

    req.on("end", () => {
      try {
        const data = JSON.parse(body);
        const message = String(data.message || "");

        console.log("[MESSAGE FROM HTML]", message);

        res.writeHead(200, {
          "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
          success: true,
          message: message
        }));

      } catch (error) {
        console.error(error);

        res.writeHead(400, {
          "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
          success: false,
          error: "Invalid JSON"
        }));
      }
    });

    return;
  }

  res.writeHead(404);
  res.end("Not found");
});

server.listen(PORT, "0.0.0.0", () => {
  console.log("Server started!");
  console.log("Port:", PORT);
});
