const jwt = require("jsonwebtoken");
const config = require("../config");

const createToken = (user, callback) => {
  let token = jwt.sign(
    { id: user.id },
    config.secret,
    { expiresIn: 86400 },
    (err, token) => {
      if (err) {
        console.log(err);
        callback(err);
      } else {
        callback(null, token);
      }
    }
  );
};

const getIdFromToken = (token, callback) => {
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      callback(null, decoded);
    }
  });
};

module.exports = {
  createToken,
  getIdFromToken
};
