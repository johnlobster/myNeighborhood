const db = require("../models");
const {createPassword, validatePassword, getJWT} = require("./authentication");
const { wError, wInfo, wDebug, wObj } = require ("../scripts/debug")("loginController");


module.exports = {
  verifyUser: function(req,res) {
    // expect req.body to have {userName, password}
    // password is user entered and not encrypted
    // get encrypted password from user database

    // wDebug("verifyUser: User " + req.body.userName + " Password " + req.body.password);

    // check inputs and reject login if field empty or missing
    // for testing, check if verified session
    if ( req.authorized) {
      wDebug("valid session token");
    }
    else {
      wDebug("no session token");
    }
    if ((req.body.userName === "") || (req.body.password === "")) {
      wDebug(" verify user, bad input field");
      res.status(204).json("");
    } else {
      db.User
        .find({userName: req.body.userName})
        .then((dbModel) => {
          if ( dbModel.length === 0) {
            wDebug("user " + req.body.userName + " not found in user database");
            res.status(204).json("");
          }
          else {
            // retrieved password, check it and send session key
            validatePassword(dbModel[0].password, req.body.password )
              .then( (validPassword) => {
                if (validPassword) {
                  wDebug("Login successful");
                  // JWT payload
                  getJWT({ userName: req.body.userName})
                    .then( (jwtToken) => {
                      // don't return _id or password
                      let sendData = db.User.returnAllowedUserData(dbModel[0]);
                      res.json({ jwt: jwtToken, userData: sendData});
                    })
                    .catch((err) => {
                      wError("getJWT failed");
                      res.status(204).json();
                    })
                }
                else {
                  wDebug("bad password for user " + req.body.userName);
                  res.status(204).json("");
                }
              })
              .catch( (err) => {
                // bcrypt seems to throw .... return something
                res.status(204).json("");
              });  
          }
        })
        .catch((err) => {
          wError("find() error during db access");
          res.status(422).json(err);
          wObj(err);
        });
    }
  }
}