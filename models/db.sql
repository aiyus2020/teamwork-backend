-- create_users_table.sql

CREATE TABLE register (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  gender VARCHAR(10),
  job_role VARCHAR(100),
  department VARCHAR(100),
  address VARCHAR(255)
);
--create table for gifs upload
CREATE TABLE upload (
  gifs_id SERIAL PRIMARY KEY,
  image VARCHAR,
  title VARCHAR(225),
  image_url VARCHAR(225)
);
CREATE TABLE  articles (
        id SERIAL PRIMARY KEY, 
        user_id INTEGER NOT NULL REFERENCES register(id), 
        title VARCHAR(225),
        article TEXT,
        created_at TIMESTAMPTZ NOT NULL  NOW(),
        updated_at TIMESTAMPTZ NOT NULL  NOW());