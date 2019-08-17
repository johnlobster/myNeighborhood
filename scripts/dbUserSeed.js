// this script is run standalone using Node
const mongoose = require("mongoose");
const db = require("../models");
const auth = require("../controller/authentication");
require("dotenv").config(); // add variables in .env file to process.env
// put the heroku mongo URI in the .env file to seed the heroku databasee
// This file empties the database and inserts the seed data below

const dbName = process.env.MONGODB_URI || "mongodb://localhost/myneighborhood"
mongoose.connect(dbName, { useNewUrlParser: true });

// encodePassword returns a promise so have to wait for it .....

const userSeed = [
  {
    userName: "jDoe",
    password: "12345",
    firstName: "John",
    lastName: "Doe",
    email: "jdoe101@hotmail.com",
    address: "7501 Folsom Auburn Rd",
    dateJoined: new Date(),
  },
  {
    userName: "janeDoe",
    password: "abcde",
    firstName: "Jane",
    lastName: "Doe",
    email: "jdoe102@hotmail.com",
    address: "7501 Folsom Auburn Rd",
    dateJoined: new Date(),
  }
];
// hash passwords
let dbSeed = userSeed.map( (seed) => {
  auth.encodePassword(seed.password)
    .then((hashedPassword) => {
      result = Object.assign({}, seed); // duplicate user object
      result.password = hashedPassword;
      console.log(result);
      return result;
    })
    .catch(err => {
      console.log("Failed in password hashing");
      console.error(err);
      process.exit(1);
    });
});

console.log(`\nClearing and seeding User in ${dbName}\n`);

// updated syntax for latest mongodb code. remove() deprecated
// repeat for each collection

// wait for dbSeed password generation to complete
setInterval( () => {
  console.log(dbSeed);

  db.User
    .bulkWrite([{ deleteMany: { filter: {} } }])
    .then(() => {
      db.User.save()
    })
    .then(data => {
      console.log("User collection: " + data.result.n + " records inserted");
      process.exit(0);
    })
    .catch(err => {
      console.log("Error in db seeding");
      console.log(err);
      process.exit(1);

    })
},4000);


  
// note for User, have to hash passwords before bulk save

