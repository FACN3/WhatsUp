const connect = require("../database/db_connection");
const bcrypt = require("bcryptjs");

const hashPassword = (password, callback) => {
  bcrypt.genSalt(10, function(err, salt) {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      console.log("pass", password, "salt", salt);
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          console.log("hii");
          console.log(err);
          callback(err);
        } else {
          callback(null, hash);
        }
      });
    }
  });
};

const comparePasswords = (password, hashedPassword, callback) => {
  bcrypt.compare(password, hashedPassword, (err, res) => {
    if (err) {
      callback(err);
    } else {
      callback(null, res);
    }
  });
};

module.exports = { hashPassword, comparePasswords };
