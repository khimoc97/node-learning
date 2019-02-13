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

//DELETE ONE USER.

module.exports = router;
