var express = require("express");
var router = express.Router();
var bcryptjs = require("bcryptjs");

var authController = require("../controllers/AuthController");
var userController = require("../controllers/UserController");

//CREATE TOKEN
router.post("/register", (req, res) => {
  userController.createUser(req.body, (err, user) => {
    if (err) res.status(500).send({ success: false, message: err.message });
    else
      authController.createToken(user, (err, token) => {
        if (err) res.status(500).send({ success: false, message: err.message });
        else res.status(200).send({ success: true, token: token });
      });
  });
});

//GET REQUESTER ID
router.get("/me", (req, res) => {
  var token = req.headers["x-access-token"];
  if (!token) {
    return res.status(401).send({ auth: false, message: "No Token Provided." });
  } else {
    authController.getIdFromToken(token, (err, data) => {
      if (err) res.status(500).send({ auth: false, message: err.message });
      else {
        userController.getUser(data.id, { password: 0 }, (err, user) => {
          if (err) res.status(500).send({ auth: false, message: err.message });
          if (!user)
            res.status(404).send({ auth: false, message: err.message });
          else res.status(200).send(user);
        });
      }
    });
  }
});

//LOGIN
router.post("/login", (req, res) => {
  userController.getLoginUser(req, (err, user) => {
    if (err) res.status(500).send({ login: false, message: err.message });
    if (!user) res.status(404).send({ login: false, message: err.message });
    else {
      var isValidPassword = bcryptjs.compareSync(
        req.body.password,
        user.password
      );
      if (!isValidPassword) res.status(401).send({ auth: false, token: null });
      else {
        authController.createToken(user, (err, token) => {
          if (err)
            res.status(500).send({ success: false, message: err.message });
          else res.status(200).send({ auth: true, token: token });
        });
      }
    }
  });
});

//LOGOUT
router.get("/logout", (req, res) => {
  res.status(200).send({ auth: false, token: null });
});

module.exports = router;
