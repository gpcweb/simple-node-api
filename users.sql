DROP DATABASE IF EXISTS users;
CREATE DATABASE users;

\c users;

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  name VARCHAR,
  email VARCHAR,
  age INTEGER,
  sex VARCHAR
);

INSERT INTO users (name, email, age, sex)
  VALUES ('Tyler', 'tyler@gmail.com', 28, 'M');
