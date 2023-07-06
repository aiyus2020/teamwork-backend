const express = require("express");
const cors = require("cors");
const app = express();
const register = require("./routes/register");
const login = require("./routes/login");
//middleware
app.use(cors());
app.use(express.json());
app.use("/", register);
app.use("/", login);

const PORT = process.env.PORT || 5000;
//listening for server
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
