const handler = require("./handler");
const qs = require("querystring");

const router = (req, res) => {
  var url = req.url;
  console.log(url);
  var method = req.method;
  console.log(method);
  if (url === "/" || url.includes("/public") || url.includes("/signUp")) {
    handler.publicHandler(req, res);
  } else if (url.includes("/registration") && method == "POST") {
    handler.createUser(req, res);
  } else {
    res.end("errorrrrr");
  }
};

module.exports = router;
