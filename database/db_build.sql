BEGIN;

DROP TABLE IF EXISTS users, messages cascade;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(40) NOT NULL,
  permission INTEGER NOT NULL,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL
);

CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  userid INTEGER REFERENCES users(id),
  time_stamp TIMESTAMP NOT NULL,
  description TEXT NOT NULL
);


INSERT INTO users (name, permission, email, password)
VALUES ('nick', 1, 'nick@nick.com', '1234'),
('idan', 1, 'idan@idan.com' , '12344'),
('marlen', 1, 'marlen@marlen.com', '123444');

INSERT INTO messages (userid, description, time_stamp)
VALUES (1, 'test', '20017-12-16 06:00:00');

COMMIT;
