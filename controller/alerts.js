const db = require("../models");
const { wError, wInfo, wDebug, wObj } = require("../scripts/debug")("alerts");
const moment = require("moment");

module.exports = {
  newAlert: function (req, res) { // POST a new alert
    if (! req.authorized) {
      wDebug("No session token, return 401");
      res.status(401).json({ message: "Must be logged in to create a new alert" });
    }
    else if (
      // check required inputs 
      (req.body.userName === "") ||
      (req.body.title === "") ||
      !req.body.userName ||
      !req.body.title ||
      !req.body.expiresDate
    ) {
      wDebug("user name, title or expiresDate missing, return 401");
      res.status(401).json({ message: "Missing user name, title or expires date"});
    } else {
      req.body.createdDate = moment();
      db.Alert
        .create(req.body)
        .then((dbResult) => {
          res.json({message: "success"});
        })
        .catch((err) => {
          wError("registration generated error");
          res.status(500).json({ message: "server error, could not save new alert"});
          // wObj(err);
        })
      }
  },
  getAlerts: function (req, res) { // GET all alerts
    db.Alert
      .find({})
      .then((dbModel) => {
        res.json(dbModel);
      })
      .catch((err) => {
        wError("find() error during Alert db access");
        res.status(422).json(err);
        wObj(err);
      });
  }
}