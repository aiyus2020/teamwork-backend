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
    await client.connect(); // Connect to the database

    // Register Table
    const createUsersTableQuery = `
      CREATE TABLE IF NOT EXISTS register (
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
    `;
    await client.query(createUsersTableQuery);

    // Gifs Table
    const gifUpload = `
      CREATE TABLE IF NOT EXISTS upload (
        gifs_id SERIAL PRIMARY KEY,
        image VARCHAR,
        title VARCHAR(225),
        image_url VARCHAR(225)
      );
    `;
    await client.query(gifUpload);
  } catch (error) {
    console.error("Error during migration:", error.message);
  } finally {
    client.end(); // Close the database connection after all queries are executed
  }
}

// Call the migration function
dbMigration();
