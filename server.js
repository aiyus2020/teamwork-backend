const express = require("express");
const cors = require("cors");
const app = express();
const client = require("./db");
const users = require("./routes/routes");

//middleware
app.use(cors());
app.use(express.json());
app.use("/routes", users);

const PORT = process.env.PORT || 5000;
//listening for server
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
