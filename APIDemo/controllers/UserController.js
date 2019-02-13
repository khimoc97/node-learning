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
const updateUser = (id, callback) => {
  usersModel.findByIdAndUpdate(id, (err, data) => {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      callback(null, data);
    }
  });
};

//DELETE ONE USER.

module.exports = {
  createUser,
  getAllUser,
  getUser,
  updateUser
};
