const express = require("express");
const routes = require("./routes");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config(); // add variables in .env file to process.env
const PORT = process.env.PORT || 3001;


// set up database
if (process.env.NODE_ENV === "test") {
  // for testing, use a different database than development, otherwise may get clashes
  process.env.MONGODB_URI = "mongodb://localhost/myneighborhood_test";
}
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/myneighborhood";
// don't need to load models as the database is not accessed directly from the server
// added in to check everything is loading and linking properly
const db = require("./models");
mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => console.log("Connected to mongoose/mongodb database"))
  .catch(err => {
    console.log("Problem connecting to mongodb");
    throw new Error(err);
  });

// set up express
const app = express();
// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// add routes here ("required" at beginning of script)
// routes.index.js contains the default route that loads the react files to the browser
app.use(routes);


app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});

// export app and db so that they can be used in testing
// app is used to check that server started, db is used for clearing database,
// and checking that data was set correctly
module.exports = { server:app, db:db}
