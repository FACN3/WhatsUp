const handler = require("./handler");
const qs = require("querystring");

const router = (req, res) => {
  var url = req.url;
  var method = req.method;
  console.log(url);
  if (url === "/" || url.includes("/public")) {
    handler.publicHandler(req, res);
  } else {
    res.end("errorrrrr");
  }
};

module.exports = router;
