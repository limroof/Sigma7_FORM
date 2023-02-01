require("dotenv").config();
const PORT = process.env.PORT || 5000;

const express = require("express");
var bodyParser = require("body-parser");
var app = express();
var cors = require("cors");

const thematiqueRouter = require("./Routes/EmailRoute");

app.use(cors());
app.use(bodyParser.json());
/* app.use(express.urlencoded()); */

app.use("/send", thematiqueRouter);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
