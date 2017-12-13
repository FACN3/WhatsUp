const connect = require('../../database/db_connection');

const validUser = (email, cb) => {
  connect.query('SELECT * FROM users WHERE email = $1', [email], (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res.rows[0]);
    }
  });
};
module.exports = { validUser };
