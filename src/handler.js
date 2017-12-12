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
      console.log(url);
      res.writeHead(500, { "Content-Type": "text/html" });
      console.log(err);
      return res.end("Internal Server Erroooor");
    }
    res.writeHead(200, { "Content-Type": extensionType });
    res.end(data);
  });
};

//sign up page
const createUser = (req, res) => {
  let data = "";
  req.on("data", chunk => {
    console.log('chunk recieved: ', chunk);
    data += chunk;
  });
  req.on("end", () => {
    console.log(data)
    const formSubmittedData = queryString.parse(data);
    hash.hashPassword(formSubmittedData.password, (err, newPassword) => {
      if (err) {
        console.log(err);
      } else {
        var values = {
          password: newPassword,
          username: formSubmittedData.username,
          email: formSubmittedData.email,
          permission: formSubmittedData.permission
        };
        // formSubmittedData.password = newPassword
        postData.createUser(values, (err, data) => {
          if (err) {
            console.log(err, "error for not getting data");
            res.writeHead(500, { "Content-Type": "text/html" });
            res.end(err);
          } else {
            console.log(data, "dataaaaaaaaaaaaaa");
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(data);
          }
        });
      }
    });
  });
  req.on('error', err => {
    console.log(err)
  });
};

module.exports = { publicHandler, createUser };
