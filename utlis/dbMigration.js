const client = require("../models/db");

async function registerTable() {
  try {
    const createUsersTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
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
    console.log("Users table created successfully.");
  } catch (error) {
    console.error("Error creating users table:", error.message);
  } finally {
    client.end();
  }
}

registerTable();
