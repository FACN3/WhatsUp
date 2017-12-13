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

module.exports = { createUser };
