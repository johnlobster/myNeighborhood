const { wError, wInfo, wDebug, wObj } = require("../scripts/debug")("authenticate");


const passport = require("passport");


module.exports = {
  createPassword: (password) => {
    // encrypt password
    wDebug("Encrypt password. original was " + password);
    return "Encrypted password";
  },
  validatePassword: (user, password, unencryptedPassword) => {
    wDebug("Validate password " + password + " and " + unencryptedPassword);
    // no encryption yet
    if ( password === unencryptedPassword) {
      return true;
    }
    else {
      return false;
    }
  },
  getJWT: () => {
    wDebug("get JWT");
    return "JWT";
  },
  checkJWT: (jwt) => {
    wDebug("Check JWT");
    return true;
  }
}
