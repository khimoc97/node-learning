const bcrypt = require("bcrypt");
const usersModel = require("../models/User");

//CREATE NEW USER.
const createUser = (user, callback) => {
  bcrypt.hash(user.password, 10, (err, hash) => {
    let newUser = {
      name: user.name,
      email: user.email,
      password: hash
    };
    usersModel.create(newUser, (err, data) => {
      if (err) {
        console.log(err);
        callback(err);
      } else {
        callback(null, data);
      }
    });
  });
};

//GET ALL USER.
const getAllUser = callback => {
  usersModel.find({}).exec((err, data) => {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      callback(null, data);
    }
  });
};

//GET ONE USER.
const getUser = (id, callback) => {
  usersModel.findById(id).exec((err, data) => {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      callback(null, data);
    }
  });
};

//UPDATE ONE USER.
const updateUser = (id, body, returnNew, callback) => {
  usersModel.findByIdAndUpdate(id, body, returnNew, (err, data) => {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      callback(null, data);
    }
  });
};

//DELETE ONE USER.
const deleteUser = (id, callback) => {
  usersModel.findByIdAndRemove(id, (err, data) => {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      callback(null, data);
    }
  });
};

module.exports = {
  createUser,
  getAllUser,
  getUser,
  updateUser,
  deleteUser
};
