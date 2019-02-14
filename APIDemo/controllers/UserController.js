const bcrypt = require("bcryptjs");
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
const getUser = (id, projection, callback) => {
  usersModel.findById(id, projection).exec((err, data) => {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      callback(null, data);
    }
  });
};

//GET USER - LOGIN
const getLoginUser = (req, callback)=>{
  usersModel.findOne({email: req.body.email}, (err, user)=>{
    if(err){
      console.log(err);
      callback(err);
    }else{
      callback(null, user);
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
  deleteUser,
  getLoginUser
};
