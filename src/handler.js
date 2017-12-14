require('env2')('config.env');
const fs = require('fs');
const path = require('path');
const queryString = require('querystring');
const hash = require('./hash');
const postData = require('./queries/postData');
const getData = require('./queries/getData');
const { sign, verify } = require('jsonwebtoken');

const publicHandler = (req, res) => {
  var url = req.url; // refactor req => {url}
  if (url === '/') {
    url = '/public/login.html';
  } else if (url.includes('/registration')) {
    url = '/public/signUp.html';
  }

  var parts = url.split('.')[1];

  var extensionType = {
    css: 'text/css',
    html: 'text/html',
    js: 'application/javascript',
    ico: 'image/x-icon',
    json: 'application/json'
  }[parts];
  fs.readFile(path.join(__dirname, '..', url), (err, data) => {
    if (err) {
      res.writeHead(500, { 'content-type': 'text/html' });
      return res.end('Internal Server Error');
    }
    res.writeHead(200, { 'content-type': extensionType });
    res.end(data);
  });
};

//handle chatRoom
const chatRoomHandler = (req, res) => {
  if (!req.headers.cookie) {
    //cheking if the cookie does not exist as in there's no user with tha email signed up, then stay at home!
    res.writeHead(302, { Location: '/' });
    res.end();
  } else {
    verify(
      req.headers.cookie.split('=')[1],
      process.env.SECRET,
      (err, cookie) => {
        // get the value of the cookie and the secret
        if (err) {
          res.writeHead(302, { Location: '/' });
          res.end();
        } else {
          // if an email exists in our database then go to chatRoom
          fs.readFile(
            path.join(__dirname, '..', 'public/chatRoom.html'),
            (err, data) => {
              if (err) {
                res.writeHead(500, { 'content-type': 'text/html' });
                return res.end('Internal Server Error');
              }
              res.writeHead(200, { 'content-type': 'text/html' });
              res.end(data);
            }
          );
        }
      }
    );
  }
};

//sign up page
const createUser = (req, res) => {
  let data = '';
  req.on('data', chunk => {
    data += chunk;
  });
  req.on('end', () => {
    const formSubmittedData = queryString.parse(data);
    hash.hashPassword(formSubmittedData.password, (err, newPassword) => {
      if (err) {
      } else {
        var values = {
          password: newPassword,
          email: formSubmittedData.email,
          name: formSubmittedData.name
        };
        // refacctor to formSubmittedData.password = newPassword
        postData.createUser(values, (err, data) => {
          if (err) {
            res.writeHead(500, { 'content-type': 'text/html' });
            res.end(err);
          } else {
            res.writeHead(302, {
              Location: '/login'
            });
            res.end(data);
          }
        });
      }
    });
  });
  req.on('error', err => {});
};

//login page
const login = (req, res) => {
  let data = '';
  req.on('data', chunk => {
    data += chunk;
  });
  req.on('end', () => {
    const submittedLogin = queryString.parse(data);
    getData.validUser(submittedLogin.email, (err, result) => {
      if (err) {
      } else {
        if (result.length == 0) {
          res.writeHead(302, {
            Location: '/'
          });
          res.end('User does not exist');
        } else {
          hash.comparePasswords(
            submittedLogin.password,
            result[0].password, // the callback from getData.js..since its res.rows and nor res.rows[0].. we need to apply result[0].password
            (err, hashed) => {
              if (err) {
                console.log(err, 'user does not exist');
              } else {
                const user = {
                  email: submittedLogin.email,
                  id: result[0].id
                };
                //creating a token
                const signJWT = sign(user, process.env.SECRET);
                res.setHeader('Set-Cookie', `jwt=${signJWT};  Max-Age:9000`);
                res.writeHead(302, {
                  Location: '/chatRoom'
                });
                res.end();
              }
            }
          );
        }
      }
    });
  });
  req.on('error', err => {});
};

//message page
const message = (req, res) => {
  let message = '';
  req.on('data', chunk => {
    message += chunk;
  });
  req.on('end', () => {
    const newMessage = queryString.parse(message);
    //decoding cookie
    verify(
      req.headers.cookie.split('=')[1],
      process.env.SECRET,
      (err, decodedCookie) => {
        if (err) {
          res.writeHead(401, { 'Content-Type': 'text/html' });
          res.end('you are using an invalid cookie');
        } else {
          const messagePost = {
            userid: decodedCookie.id,
            time_stamp: JSON.stringify(new Date()),
            description: newMessage.description
          };
          postData.createMessage(messagePost, (err, createMessageResult) => {
            if (err) {
              res.writeHead(500, { 'Content-Type': 'text/html' });
              res.end('description is not valid');
            } else {
              res.writeHead(302, {
                Location: '/chatRoom'
              });
              res.end();
            }
          });
        }
      }
    );
  });
  req.on('error', err => {
    console.log(err);
  });
};

const getMessages = (req, res) => {
  getData.getMessages((err, messages) => {
    if (err) {
      console.log(err);
    } else {
      res.writeHead(200, { 'content-type': 'application/json' });
      res.end(JSON.stringify(messages));
    }
  });
};

//LOG OUT
const logout = (req, res) => {
  res.writeHead(302, {
    'content-type': 'text/plain',
    Location: '/',
    'Set-Cookie': `jwt=0;  Max-Age=0`
  });
  res.end();
};

module.exports = {
  publicHandler,
  createUser,
  login,
  chatRoomHandler,
  message,
  logout,
  getMessages
};
