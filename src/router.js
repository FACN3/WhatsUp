const handler = require('./handler');
const qs = require('querystring');

const router = (req, res) => {
  const url = req.url;
  const method = req.method;
  console.log(`${req.method} ${req.url}`);

  // {
  //   '/': {
  //     'GET': publicHandler
  //   },
  //   /registration: {
  //     'GET': publicHandler,
  //     'POST': createUser
  //   }
  // }


  if (url === '/' || url.includes('/public') || (url.includes('/registration') && method === 'GET')) {
    handler.publicHandler(req, res);
  } else if (url === '/chatRoom') {
    handler.chatRoomHandler(req, res);
  } else if (url.includes('/registration')) {
    handler.createUser(req, res);
  } else if (url.includes('/login')) {
    handler.login(req, res);
  } else if (url.includes('/newMessage')) {
    handler.message(req, res);
  } else if (url.includes('/logout')) {
    handler.logout(req, res);
  } else if (url.includes('/getMessages')) {
    handler.getMessages(req, res);
  } else {
    res.writeHead(404, { 'content-type': 'text/html' });
    res.end('error');
  }
};

module.exports = router;
