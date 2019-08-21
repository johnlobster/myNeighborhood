const mongoose = require("mongoose");

/*
  Alerts are short-lived flags to something important happening in the neighborhood
  When expires date < 'now', should no longer be shown as an alert. Old alerts are kept for reference
  user must be logged in to create a new alert
*/

const UserSchema = new mongoose.Schema({
  userName: { // could link this to User model to get additional user data
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  expiresDate: {
    type: String,
    required: true
  },
  createdDate: {
    type: Date,
    required: true
  },
  message: {
    type: String,
    default: ""
  }
});

// This creates our model from the above schema, using mongoose's model method
const Alert = mongoose.model("Alert", UserSchema);

module.exports = Alert;
