const { Client } = require("pg");
const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "Teamwork",
  password: "aiyudubie10",
  port: 5432,
});

async function dbMigration() {
  try {
    // Connect to the database
    await client.connect();

    // Register Table
    const createUsersTableQuery = `
      CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        first_name VARCHAR(100),
        last_name VARCHAR(100),
        gender VARCHAR(10),
        job_role VARCHAR(100),
        department VARCHAR(100),
        address VARCHAR(255),
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )`;
    await client.query(createUsersTableQuery);

    // Gifs Table
    const gifUpload = `
      CREATE TABLE IF NOT EXISTS upload (
        gifs_id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id),
        title VARCHAR(225),
        image_url VARCHAR(225),
        cloud_public_id VARCHAR,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )`;
    await client.query(gifUpload);

    // Articles Table
    const articles = `
      CREATE TABLE IF NOT EXISTS articles (
        id SERIAL PRIMARY KEY, 
        user_id INTEGER NOT NULL REFERENCES users(id), 
        title VARCHAR(225),
        article TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )`;
    await client.query(articles);

    const articleComment = `CREATE TABLE IF NOT EXISTS article_comments (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id),
      article_id INTEGER NOT NULL REFERENCES articles(id),
      comment TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )`;
    await client.query(articleComment);
    const gifComment = `CREATE TABLE IF NOT EXISTS gif_comments (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id),
      gif_id INTEGER NOT NULL REFERENCES upload(gifs_id),
      comment TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )`;
    await client.query(gifComment);
  } catch (error) {
    console.error("Error during migration:", error.message);
  } finally {
    client.end(); // Close the database connection after all queries are executed
  }
}

// Call the migration function
dbMigration();
