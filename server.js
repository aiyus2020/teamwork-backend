const express = require("express");
const cors = require("cors");
const app = express();
const user = require("./routes/userRoute");

//middleware
app.use(cors());
app.use(express.json());
app.use("/", user);

const PORT = process.env.PORT || 5000;
//listening for server
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
