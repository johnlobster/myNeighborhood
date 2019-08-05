const passport = require("passport");


module.exports = {
  createPassword: (password) => {
    // encrypt password
    return "Encrypted password";
  },
  validatePassword: (user, password) => {
    return
  },
  getJWT: () => {
    return "JWT";
  }
}
