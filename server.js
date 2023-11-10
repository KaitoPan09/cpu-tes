const express = require("express");
const https = require("https");
const fs = require("fs");
const path = require("path");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
const port = process.env.PORT || 3000;
const apiProxy = createProxyMiddleware("/api", {
  target: "https://127.0.0.1:5000",
});

// Serve static files from the 'build' folder
app.use(express.static(path.join(__dirname, "build")));
app.use(apiProxy);

// Serve React app on all routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Load SSL certificate and key
const options = {
  key: fs.readFileSync("key.pem"),
  cert: fs.readFileSync("cert.pem"),
};

// Create an HTTPS server
https.createServer(options, app).listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
