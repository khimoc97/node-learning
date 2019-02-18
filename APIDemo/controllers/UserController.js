const bcryptjs = require("bcryptjs");
const usersModel = require("../models/User");

//CREATE NEW USER.
const createUserAsync = async user => {
  let hashedPassword = await bcryptjs.hash(user.password, 10);

  let newUser = {
    name: user.name,
    email: user.email,
    password: hashedPassword
  };
  let data = await usersModel.create(newUser);

  return data;
};

//GET ALL/ONE USER.
const getUserAsync = async (condition, projection) => {
  let listUser = await usersModel.find(condition, projection);
  return listUser;
};

//UPDATE ONE USER.
const updateUserAsync = async (id, body, returnNew) => {
  let updatedUser = await usersModel.findByIdAndUpdate(id, body, returnNew);
  return updatedUser;
};

//DELETE ONE USER.
const deleteUserAsync = async id => {
  let user = await usersModel.findByIdAndRemove(id);
  return user;
};

module.exports = {
  createUserAsync,
  getUserAsync,
  updateUserAsync,
  deleteUserAsync
};
