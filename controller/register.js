const db = require("../models");
const {encodePassword, getJWT} = require("./authentication");
const { wError, wInfo, wDebug, wObj } = require ("../scripts/debug")("register");


module.exports = function (req, res) {
    // req.body must have {userName, password}, all other fields optional
    // password is user entered and not encrypted
    // must return relevant messages if something is wrong, along with empty jwt
    // to be consistent

    wDebug("User " + req.body.userName + " Password " + req.body.password);

    // check inputs and reject register if userName/password empty or missing
    
    if ((req.body.userName === "") || (req.body.password === "")) {
      wDebug("user name or password missing, return 204");
      res.status(204).json({ message: "Missing password or user name", jwt: ""});
    } else {
      db.User
        .find({userName: req.body.userName})
        .then((dbModel) => {
          if ( dbModel.length !== 0) {
            wDebug("user " + req.body.userName + " already in user database");
            res.status(401).json({ message: "User name already exists", jwt: ""});
          }
          else {
            // encrypt password
            encodePassword(req.body.password)
              .then( (hashedPassword) => {
                req.body.password = hashedPassword;
                req.body.dateJoined = new Date();
                // wDebug("mongoose create()");
                // wObj(req.body);
                return db.User.create(req.body);
              })
              .then( (dbResult) => {
                wObj(dbResult);
                // successful database write so generate jwt
                return getJWT({ userName: req.body.userName });
              })
              .then( (jwtToken) => {
                wDebug("Generated jwt Token");
                wObj(jwtToken);
                wInfo("Successful registration");
                res.json( {
                  message: "success", 
                  jwt: jwtToken, 
                  userData: db.User.returnAllowedUserData(req.body) 
                });

              })
              .catch((err) => {
                wError("registration generated error");
                res.status(500).json({message: "server error", jwt: ""});
                wObj(err);
              })
              
          }
        })
      .catch((err) => {
        wError("error during db access");
        res.status(500).json(err);
        wObj(err);
      });
    }
}