const mongoose = require("mongoose");

// Note:
// this file creates a method on the schema (static function) that limits the data items
// returned to the user
// If we add additional data items to User, then should add the same items to 
// the returnAllowedUserData method
// This is done so that all accesses to user data are in one place
// returnAllowedUserData is used in the login controller, passing the allowed data to a
// res.json call, which passes this data to the client

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
const UserSchema = new Schema({
  userName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    default: ""
  },
  lastName: {
    type: String,
    default: ""
  },
  email: {
    type: String,
    default: ""
  },
  address: {
    type: String,
    default: ""
  },
  dateJoined: Date
});

UserSchema.statics.returnAllowedUserData = function(userObject) {
  return {
    userName: userObject.userName,
    firstName: userObject.firstName,
    lastName: userObject.lastName,
    email: userObject.email,
    address: userObject.address
  }
};

// This creates our model from the above schema, using mongoose's model method
const User = mongoose.model("User", UserSchema);

// Export the User model
module.exports = User;
