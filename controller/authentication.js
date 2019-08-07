const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { wError, wInfo, wDebug, wObj } = require("../scripts/debug")("authenticate");

const saltIterations = 12;
const jwtExpirationTime = "2 days";

process.env.JWT_KEY = process.env.JWT_KEY || "eiwroweireoirhoeirhoiewthot"

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
  getJWT: (payload) => {
    return new Promise( (resolve, reject) => {
      // wDebug("get JWT payload " + JSON.stringify(payload));
      const signOptions = {
        expiresIn: jwtExpirationTime
      }
      jwt.sign(payload, process.env.JWT_KEY, signOptions, function (err, token) {
        if (err) {
          wError("Error in JWT generation");
          reject(err);
        }
        else {
          resolve(token);
        }
      });
    })
  },
  validateJWT: (jwtToken) => {
    return new Promise( (resolve, reject) => {
      wDebug("Validate JWT");
      jwt.verify(jwtToken,process.env.JWT_KEY)
        .then( (payload) => {
          resolve(payload);
        })
        .catch( err => {
          wError("Error occurred in validateJWT");
          reject(err);
        })
      resolve(true)
    });
  },
  authenticationMiddleware: (req, res, next) => {
    // dummy for the moment, but would call validateJWT if there is a jwt token in the header,
    // then create req.jwtVerified to be true or false
    // ? jwtUserId for checking ?
    // may fail because token is expired
    next();
  }
}
