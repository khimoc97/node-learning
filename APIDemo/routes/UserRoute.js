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

//GET ONE USER.
UserRouter.get("/:id", function(req, res) {
  User.findById(req.params.id, function(err, user) {
    if (err)
      return res.status(500).send("There was a problem finding the user.");
    if (!user) return res.status(404).send("No user found.");
    res.status(200).send(user);
  });
});

//DELETE ONE USER.
UserRouter.delete("/:id", function(req, res) {
  User.findByIdAndRemove(req.params.id, function(err, user) {
    if (err)
      return res.status(500).send("There was a problem finding the user.");
    if (!user) return res.status(404).send("No user fond.");
    res.status(200).send("User " + user.name + " was delete.");
  });
});

//UPDATE ONE USER.
UserRouter.put("/:id", function(req, res) {
  User.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, user) {
    if (err)
      return res.status(500).send("There was a problem finding the user.");
    if (!user) return res.status(404).send("No user found.");
  res.status(200).send(user);
  });
});

module.exports = UserRouter;