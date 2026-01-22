CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(50) NOT NULL,
  password VARCHAR(60) NOT NULL,
  rol VARCHAR(25),
  lenguage VARCHAR(25)
);

CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  img VARCHAR(1000),
  name VARCHAR(50),
  price INT,
  description VARCHAR(1000),
  stock INT
);
