const fs = require("fs");
const path = require("path");

const publicHandler = (req, res) => {
  var url = req.url;
  if (url === "/") {
    url = "/public/login.html";
  }
  var parts = url.split(".")[1];
  var extensionType = {
    css: "text/css",
    html: "text/html",
    js: "application/javascript",
    ico: "image/x-icon",
    json: "application/json"
  }[parts];
  fs.readFile(path.join(__dirname, "..", url), (err, data) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/html" });
      console.log(err);
      return res.end("Internal Server Erroooor");
    }
    res.writeHead(200, { "Content-Type": extensionType });
    res.end(data);
  });
};

module.exports = { publicHandler };
