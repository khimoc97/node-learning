var express = require("express");
var UserRouter = express.Router();

var User = require("../models/User");

//CREATE A NEW USER
UserRouter.post("/", function(req, res) {
  User.create(
    {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    },
    function(err, user) {
      if (err)
        return res
          .status(500)
          .send("There was a problem adding the information to the database.");
      res.status(200).send(user);
    }
  );
});

//RETURN ALL THE USER IN THE DB
UserRouter.get("/", function(req, res) {
  User.find({}, function(err, users) {
    if (err)
      return res.status(500).send("There was a problem finding the users.");
    res.status(200).send(users);
  });
});

module.exports = UserRouter;
