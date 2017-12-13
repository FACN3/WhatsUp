const connect = require('../../database/db_connection');

const validUser = (email, cb) => {
  connect.query('SELECT * FROM users WHERE email = $1', [email], (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res.rows);
      // refactor to cb(err, res.rows);
    }
  });
};

const getMessages = cb => {
  connect.query(
    `SELECT *
     FROM messages m INNER JOIN users u
     on m.userid = u.id
      LIMIT 50`,
    (err, res) => {
      if (err) {
        cb(err);
      } else {
        cb(null, res.rows);
        //refactor to cb(err, res.rows);
      }
    }
  );
};
module.exports = { validUser, getMessages };
