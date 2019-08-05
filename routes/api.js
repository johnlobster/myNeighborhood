const router = require("express").Router();

const login = require("./controller/loginController");

// Matches with "/api"
// router.route("/api")
//   .get(booksController.findAll)
//   .post(booksController.create);

// login route
router.route("/api/login")
  .post(login.verifyUser);

module.exports = router;