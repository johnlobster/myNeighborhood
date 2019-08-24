// this script is run standalone using Node
const mongoose = require("mongoose");
const db = require("../models");
require("dotenv").config(); // add variables in .env file to process.env
// put the heroku mongo URI in the .env file to seed the heroku databasee
// This file empties the database and inserts the seed data below

const dbName = process.env.MONGODB_URI || "mongodb://localhost/myneighborhood"
mongoose.connect(dbName, { useNewUrlParser: true });
const moment = require("moment");

// encodePassword returns a promise so have to wait for it .....




const alertSeed = [
  // active alert
  {
    userName: "janeDoe",
    title: "Suspicious character",
    expiresDate: moment().add(4, "hours").toDate(),
    createdDate: moment().toDate(),
    message: "Climbed over my fence, PD called"
  },
  {
    userName: "jDoe",
    title: "accident at Folsom Auburn/Greenback",
    expiresDate: moment().add(2, "hours").toDate(),
    createdDate: moment().toDate(),
    message: "PD says will be cleared in 4 hours"
  },
  
  // old alert
  {
    userName: "jDoe",
    title: "Roadworks on Folsom Auburn",
    expiresDate: moment().subtract(20, "hours").toDate(),
    createdDate: moment().subtract(24,"hours").toDate(),
    message: "Evenings only"
  },
  {
    userName: "janeDoe",
    title: "Lost dog",
    expiresDate: moment().subtract(20, "hours").toDate(),
    createdDate: moment().subtract(24, "hours").toDate(),
    message: "My black lab, Nicky has gone missing - my phone No. is on her collar"
  }
];
console.log(`\nClearing and seeding ${dbName}\n`);

// updated syntax for latest mongodb code. remove() deprecated
// repeat for each collection
db.Alert
.bulkWrite([{ deleteMany: { filter: {} } }])
.then(() => db.Alert.collection.insertMany(alertSeed))
.then(data => {
  console.log("Alert collection: " + data.result.n + " records inserted");
  process.exit(0);
})
.catch(err => {
  console.error(err);
  process.exit(1);
});
  

