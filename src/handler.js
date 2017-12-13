const fs = require("fs");
const path = require("path");
const queryString = require("querystring");
const hash = require("./hash");
const postData = require("./queries/postData");

const publicHandler = (req, res) => {
  var url = req.url;
  if (url === "/") {
    url = "/public/login.html";
  } else if (url.includes("/signup")) {
    url = "/public/signUp.html";
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
      res.writeHead(500, { "content-type": "text/html" });
      return res.end("Internal Server Error");
    }
    res.writeHead(200, { "content-type": extensionType });
    res.end(data);
  });
};

//sign up page
const createUser = (req, res) => {
  let data = "";
  req.on("data", chunk => {
    data += chunk;
  });
  req.on("end", () => {
    const formSubmittedData = queryString.parse(data);
    hash.hashPassword(formSubmittedData.password, (err, newPassword) => {
      if (err) {
      } else {
        var values = {
          password: newPassword,
          email: formSubmittedData.email,
          name : formSubmittedData.name
        };
        // formSubmittedData.password = newPassword
        postData.createUser(values, (err, data) => {
          if (err) {
            res.writeHead(500, { "content-type": "text/html" });
            res.end(err);
          } else {
            res.writeHead(200, { "content-type": "text/html" });
            res.end(data);
          }
        });
      }
    });
  });
  req.on('error', err => {
  });
};

module.exports = { publicHandler, createUser };
