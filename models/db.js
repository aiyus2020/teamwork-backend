const { Client } = require("pg");
const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "Teamwork",
  password: "aiyudubie10",
  port: 5432,
});
client.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});
module.exports = client;
