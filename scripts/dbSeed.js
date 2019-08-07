// this script is run standalone using Node
const mongoose = require("mongoose");
const db = require("../models");
const auth = require("../controller/authentication");
// This file empties the database and inserts the seed data below

const dbName = process.env.MONGODB_URI || "mongodb://localhost/myneighborhood"
mongoose.connect(dbName, { useNewUrlParser: true });

// encodePassword returns a promise so have to wait for it .....
auth.encodePassword("12345")
  .then((jDoePassword) => {
    const userSeed = [
      {
        userName: "jDoe",
        password: jDoePassword,
        firstName: "John",
        lastName: "Doe",
        email: "jdoe101@hotmail.com",
        address: "7550 Folsom Auburn Rd",
        dateJoined: new Date(),
      }
    ]

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
  });
// note for User, have to hash passwords before bulk save

