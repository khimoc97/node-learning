const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");

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
  userController.getUser(req.params.id, {}, (err, data) => {
    if (err) res.status(500).send({ success: false, message: err.message });
    if (!data) res.status(404).send({ success: true, message: err.message });
    else res.status(200).send(data);
  });
});

router.put("/:id", (req, res) => {
  userController.updateUser(
    req.params.id,
    req.body,
    { new: true },
    (err, data) => {
      if (err) res.status(500).send({ success: false, message: err.message });
      if (!data) res.status(404).send({ success: true, message: err.message });
      else res.status(200).send(data);
    }
  );
});

//DELETE ONE USER.
router.delete("/:id", (req, res) => {
  userController.deleteUser(req.params.id, (err, data) => {
    if (err) res.status(500).send({ success: false, message: err.message });
    if (!data) res.status(404).send({ success: true, message: err.message });
    else res.status(200).send(data);
  });
});

module.exports = router;
