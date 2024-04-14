const { Client } = require("pg");

// Replace with your Supabase credentials
const supabaseUrl = "https://ulawiyumjpyyotizdbzi.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVsYXdpeXVtanB5eW90aXpkYnppIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5NDk0MTU3OCwiZXhwIjoyMDEwNTE3NTc4fQ.9gqzn3MErIurwTj_KcjnZT4C8D8s-Gurn7Rt5WPqHB0";

const client = new Client({
  connectionString: `postgres://postgres.ulawiyumjpyyotizdbzi:aiyudubie10@aws-0-ca-central-1.pooler.supabase.com:5432/postgres`,
});

client.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = client;
