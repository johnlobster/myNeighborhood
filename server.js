const express = require("express");
const routes = require("./routes");
const mongoose = require("mongoose");
const auth = require("./controller/authentication");
const path = require("path");
require("dotenv").config(); // add variables in .env file to process.env
const PORT = process.env.PORT || 3001;

// check NODE_ENV
console.log(`server: NODE_ENV ${process.env.NODE_ENV}`);
// debug setup here so if NODE_ENV is undefined, that gets printed out before things start
// crashing
let { wError, wInfo, wDebug, wObj } = require("./scripts/debug.js")("server.js");

// set up database
if (process.env.NODE_ENV === "test") {
  // for testing, use a different database than development, otherwise may get clashes
  process.env.MONGODB_URI = "mongodb://localhost/myneighborhood_test";
}
MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/myneighborhood";
// don't need to load models as the database is not accessed directly from the server
// added in to check everything is loading and linking properly
wDebug("Connecting to mongodb " + MONGODB_URI);
const db = require("./models");
mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => wInfo("Connected to mongoose/mongodb database"))
  .catch(err => {
    wError("Problem connecting to mongodb");
    throw new Error(err);
  });

// set up express
const app = express();
// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets for production (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// add routes here ("required" at beginning of script)
// routes.index.js contains the default route that loads the react files to the browser
app.use(routes);


app.listen(PORT, () => {
  wInfo(`🌎 ==> API server listening on port ${PORT}`);
});

// export app and db so that they can be used in testing
// app is used to check that server started, db is used for clearing database,
// and checking that data was set correctly
module.exports = { app:app, db:db}
