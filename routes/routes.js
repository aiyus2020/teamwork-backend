const express = require("express");
const router = express.Router();
const client = require("../db");
router.post("/user/api/v1", async (req, res) => {
  try {
    const { email, password } = req.body;
    const register = await client.query(
      "INSERT INTO register (email, password) VALUES ($1, $2) RETURNING *",
      [email, password]
    );
    res.json("done");
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
