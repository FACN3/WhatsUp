const tape = require('tape');

const runDbBuild = require('../database/db_buildTest');
const postData = require('../src/queries/postData');

tape('tape is working', t => {
  t.equal(1, 1, 'One equals one');
  t.end();
});

tape('testing post request', t => {
  const expected = {
    success: 'This was a success'
  };
  runDbBuild((err, response) => {
    const newUserValues = {
      name: 'name',
      email: 'email',
      password: 'password'
    };
    postData.createUser(newUserValues, (err, res) => {
      if (err) {
        console.log(`error:  + ${err}`);
      }
      t.deepEqual(res, JSON.stringify(expected), 'Returns success message');
      t.end();
    });
  });
});
