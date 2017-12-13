const connect = require('../../database/db_connection');

const createUser = (values, cb) => {
  connect.query(
    `INSERT INTO users (name, permission, email, password) VALUES ($1, $2, $3, $4)`,
    [values.name, 1, values.email, values.password],
    (err, data) => {
      if (err) {
        cb(err);
      } else {
        cb(null, JSON.stringify({ success: 'This was a success' }));
      }
      //cb(err, JSON.stringify({ success: 'This was a success' }));
    }
  );
};

const createMessage = (values, cb) => {
  console.log(values);
  connect.query(
    `INSERT INTO messages (userid, time_stamp, description) VALUES ($1, $2, $3,)`,
    [values.userid, '20017-12-16 06:00:00', values.description],
    (err, data) => {
      if (err) {
        cb(err);
      } else {
        cb(null, JSON.stringify({ success: 'This was a success' }));
      }
    }
  );
};

module.exports = { createUser, createMessage };
