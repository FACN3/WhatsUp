
const handler = require('./handler');
const qs = require('querystring');

const router = (req, res) => {
  var url = req.url;
  var method = req.method;
  console.log(`${method} ${url}`);
  if (url === '/' || url.includes('/public') || url.includes('/signup')) {
    handler.publicHandler(req, res);
  } else if (url.includes('/registration')) {
    handler.createUser(req, res);
  } else {
    res.end('error');
  }
};

module.exports = router;
