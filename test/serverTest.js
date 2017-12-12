const test = require('tape');
const shot = require('shot');
const router = require('../src/router');

test('tape is working', t => {
  t.equal(1, 1, 'one equals one');
  t.end();
});

test('Testing roter 404', t => {
  shot.inject(router, { method: 'get', url: '/fin&king&vered&hello' }, res => {
    t.equal(res.statusCode, 404, 'should respon with 404');
    t.end();
  });
});

test('Testing router to css', t => {
  shot.inject(router, { method: 'get', url: '/public/css/style.css' }, res => {
    t.equal(res.statusCode, 200, 'should responde with statusCode 200');
    t.equal(
      res.headers['content-type'],
      'text/css',
      'should return with content-type text/css'
    );
    t.end();
  });
});

test('Testibg router to js', t => {
  shot.inject(router, { method: 'get', url: '/public/js/index.js' }, res => {
    t.equal(res.statusCode, 200, 'should respon with 200');
    t.equal(
      res.headers['content-type'],
      'application/javascript',
      'should return with content-type application/javascript'
    );
    t.end();
  });
});

test('Testibg router to index.html', t => {
  shot.inject(router, { method: 'get', url: '/' }, res => {
    t.equal(res.statusCode, 200, 'should respon with 200');
    t.equal(
      res.headers['content-type'],
      'text/html',
      'should return with content-type text/html'
    );
    t.end();
  });
});
