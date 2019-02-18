const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");

//CREATE A NEW USER
router.post("/", async (req, res) => {
  try {
    let user = await userController.createUserAsync(req.body);
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

//RETURN ALL THE USER IN THE DB
router.get("/", async (req, res) => {
  try {
    let listUser = await userController.getUserAsync({}, {});
    res.status(200).send(listUser);
  } catch (error) {
    res.status(500).send(error);
  }
});

//GET ONE USER.
router.get("/:id", async (req, res) => {
  try {
    let user = await userController.getUserAsync(
      { _id: req.params.id },
      { password: 0 }
    );
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

//UPDATE USER.
router.put("/:id", async (req, res) => {
  try {
    let newUser = await userController.updateUserAsync(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).send(newUser);
  } catch (error) {
    res.status(500).send(error);
  }
});

//DELETE ONE USER.
router.delete("/:id", async (req, res) => {
  try{
    let user = await userController.deleteUserAsync(req.params.id);
    res.status(200).send(user);
  }catch(error){
    res.status(500).send(error);
  }
});

module.exports = router;
