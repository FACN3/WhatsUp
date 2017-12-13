const handler = require('./handler');
const qs = require('querystring');

const router = (req, res) => {
  const url = req.url;
  if (url === '/' || url.includes('/public') || url.includes('/signup') || url.includes('/chatRoom')) {
    handler.publicHandler(req, res);
  } else if (url.includes('/registration')) {
    handler.createUser(req, res);
  } else if (url.includes('/login')) {
    handler.login(req, res);
  } else {
    res.writeHead(404, { 'content-type': 'text/html' });
    res.end('error');
  }
};

module.exports = router;
