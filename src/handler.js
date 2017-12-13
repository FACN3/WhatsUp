require("env2")("config.env");
const fs = require("fs");
const path = require("path");
const queryString = require("querystring");
const hash = require("./hash");
const postData = require("./queries/postData");
const getData = require("./queries/getData");
const {sign, verify } = require("jsonwebtoken");


const publicHandler = (req, res) => {
  var url = req.url;
  if (url === "/") {
    url = "/public/login.html";
  } else if (url.includes("/signup")) {
    url = "/public/signUp.html";
  }
  else if (url.includes("/chatRoom")) {
    url = "/public/chatRoom.html";
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
          name: formSubmittedData.name
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
  req.on("error", err => {});
};

//login page
const login = (req, res) => {
  let data = "";
  req.on("data", chunk => {
    data += chunk;
    console.log(chunk);
  });
  req.on("end", () => {

    const submittedLogin = queryString.parse(data);

    getData.validUser(submittedLogin.email, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        hash.comparePasswords(
          submittedLogin.password,
          result.password,
          (err, hashed) => {
            if (err) {
              console.log(err, "user does not exist");
              // res.writeHead(302, {
              //   "Location": "/login"
              // });
            } else {
              var user = {
                'email': submittedLogin.email
              };
              const signJWT = sign(user, process.env.SECRET);
              res.setHeader('Set-Cookie', `jwt=${signJWT};  Max-Age:9000`);
              res.writeHead(302, {
                "Location": "/chatRoom"
              });
              res.end();
            }
          });
      }
    });
  });
  req.on("error", err => {});
};

module.exports = { publicHandler, createUser, login };
