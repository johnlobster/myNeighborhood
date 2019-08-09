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

let userData = "";
let password1="";  // temp hack
auth.encodePassword("12345")
  .then((jDoePassword) => {
    password1=jDoePassword;
    return auth.encodePassword("abcde");
  })
  .then((janeDoePassword) => {
    const userSeed = [
      {
        userName: "jDoe",
        password: password1,
        firstName: "John",
        lastName: "Doe",
        email: "jdoe101@hotmail.com",
        address: "7501 Folsom Auburn Rd",
        dateJoined: new Date(),
      },
      {
        userName: "janeDoe",
        password: janeDoePassword,
        firstName: "Jane",
        lastName: "Doe",
        email: "jdoe102@hotmail.com",
        address: "7501 Folsom Auburn Rd",
        dateJoined: new Date(),
      }
    ];
    console.log(`\nClearing and seeding ${dbName}\n`);

    // updated syntax for latest mongodb code. remove() deprecated
    // repeat for each collection
    db.User
      .bulkWrite([{ deleteMany: { filter: {} } }])
      .then(() => db.User.collection.insertMany(userSeed))
      .then(data => {
        console.log("User collection: " + data.result.n + " records inserted");
        process.exit(0);
      })
      .catch(err => {
        console.error(err);
        process.exit(1);
      });
  })
  .catch((err) => {
    console.log("Exit because of bcrypt failure");
    console.log(err);
  });
// note for User, have to hash passwords before bulk save

