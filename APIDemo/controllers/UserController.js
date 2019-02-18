const bcryptjs = require("bcryptjs");
const usersModel = require("../models/User");
const config = require("../config");

//CREATE NEW USER.
const createUserAsync = async user => {
  let hashedPassword = await hashPassword(user.password);

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
  body.password = await hashPassword(body.password,10);
  let updatedUser = await usersModel.findByIdAndUpdate(id, body, returnNew);
  return updatedUser;
};

//DELETE ONE USER.
const deleteUserAsync = async id => {
  let user = await usersModel.findByIdAndRemove(id);
  return user;
};

//Private function
const hashPassword = async (password)=>{
  return await bcryptjs.hash(password,  config.salt);
};

module.exports = {
  createUserAsync,
  getUserAsync,
  updateUserAsync,
  deleteUserAsync
};
