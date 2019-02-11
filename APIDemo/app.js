var express = require("express");
var app = express();
var db = require("./db");
var bodyParser = require("body-parser");

//Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Route
var UserRoute = require("./routes/UserRoute");
app.use("/users", UserRoute);

module.exports = app;