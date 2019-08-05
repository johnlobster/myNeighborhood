const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { wError, wInfo, wDebug, wObj } = require("../scripts/debug")("authenticate");

const saltIterations = 12;

// note promises returned as encryption takes a long time
module.exports = {
  encodePassword: (password) => {
    return new Promise( (resolve, reject) => {
      wDebug("Encrypt password. original was " + password);
      bcrypt.hash(password,saltIterations)
        .then( (hashedPassword) => {
          resolve(hashedPassword);
        })
        .catch( (err) => {
          wError("bcrypt hash function failed");
          reject(err);
        })
    });
  },
  validatePassword: (password, unencryptedPassword) => {
    return new Promise( (resolve, reject) => {
      // wDebug("Validate password " + password + " and " + unencryptedPassword);
      bcrypt.compare(unencryptedPassword,password)
        .then( (isMatch) => {
          resolve(isMatch);
        })
        .catch( (err) => {
          wError("bcrypt compare function failed");
          reject(err);
        })
    });
  },
  getJWT: () => {
    wDebug("get JWT");
    return "JWT";
  },
  validateJWT: (jwt) => {
    wDebug("Validate JWT");
    return true;
  }
}
