var express = require("express");
var router = express.Router();

var User = require("../models/User");
var userController = require("../controllers/UserController");

//CREATE A NEW USER
router.post("/", (req, res) => {
  userController.createUser(req.body, (err, data) => {
    if (err) res.status(500).send({ success: false, message: err.message });
    else res.status(200).send({ success: true });
  });
});

//RETURN ALL THE USER IN THE DB
router.get("/", (req, res) => {
  userController.getAllUser((err, data) => {
    if (err) res.status(500).send({ message: err.message });
    else res.status(200).send(data);
  });
});

//GET ONE USER.
router.get("/:id", (req, res) => {
  userController.getUser(req.params.id, (err, data) => {
    if (err) res.status(500).send({ success: false, message: err.message });
    if (!data) res.status(404).send({ success: true, message: err.message });
    else res.status(200).send(data);
  });
});

//UPDATE ONE USER.
router.put("/:id", (req, res) => {
  userController.updateUser(req.params.id, (err, data) => {
    if (err) res.status(500).send({ success: false, message: err.message });
    if (!data) res.status(404).send({ success: true, message: err.message });
    else res.status(200).send(data);
  });
});

//DELETE ONE USER.
router.delete("/:id", function(req, res) {
  User.findByIdAndRemove(req.params.id, function(err, user) {
    if (err)
      return res.status(500).send("There was a problem finding the user.");
    if (!user) return res.status(404).send("No user fond.");
    res.status(200).send("User " + user.name + " was delete.");
  });
});

module.exports = router;
