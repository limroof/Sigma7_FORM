require("dotenv").config();
const PORT = process.env.PORT || 5000;

const express = require("express");
var bodyParser = require("body-parser");
var app = express();
var cors = require("cors");

const sendEmailRouter = require("./Routes/EmailRoute");

app.use(
  cors({
    origin:
      process.env.NODE_ENV == "DEVELOPMENT"
        ? "http://localhost:3000"
        : ["https://sigma7.online,https://sigma7.ma"],
  })
);
app.use(bodyParser.json());

app.use("/send", sendEmailRouter);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
