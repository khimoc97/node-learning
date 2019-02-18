const express = require("express");
const app = express();
const db = require("./db");
const bodyParser = require("body-parser");

//Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Route
const UserRoute = require("./routes/UserRoute");
app.use("/users", UserRoute);

module.exports = app;