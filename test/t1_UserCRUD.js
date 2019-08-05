// collection User - CRU (not testing Delete)
const mongoose = require("mongoose");
const chai = require("chai");
const chaiHttp = require('chai-http');
const expect = require("chai").expect;
chai.use(chaiHttp);

// var mocha = require("mocha");
// mocha.Runner.prototype.uncaught = function (err) {
//     console.log(chalk.red("\nUNCAUGHT ERROR\n"), err);
// };

let {app,db} = require("../server");
// db and server starts are asynchronous. Instead of making server.js return a promise
// which would need to be called somewhere, just use setTimeout in the first test

describe("t1 User CRUD: start server\n", () => {
  it("Server should start", (done) => {
    // remove records from database
    db.User.bulkWrite([{ deleteMany: { filter: {} } }])
      .catch(err => {
        console.log("Error occurred whilst resetting database");
        throw new Error(err);
      });
    // wait for server to start before doing anything
    setTimeout(() => {
      // app should have lots of data in it, just check that it isn't still a blank object
      expect(typeof (app.settings)).to.equal("object");
      done();
    }, 1500);
  });
});

describe("Register user POST to /api/user TEST NOT COMPLETED", () => {
  it("send POST request", function (done) {
    expect(true).to.be.true;
    done();
  });
  it("created session in http header", function (done) {
    expect(true).to.be.true;
    done();
  });
});

describe("Login user GET from /api/user TEST NOT COMPLETED", () => {
  it("send GET request (login)", function (done) {
    expect(true).to.be.true;
    done();
  });
  it("created session in http header", function (done) {
    expect(true).to.be.true;
    done();
  });
  it("attempt login with wrong password", function (done) {
    expect(true).to.be.true;
    done();
  });
  it("attempt login with invalid user name", function (done) {
    expect(true).to.be.true;
    done();
  });
  
});

describe("Update user data PUT to /api/user TEST NOT COMPLETED", () => {
  it("send GET request ", function (done) {
    expect(true).to.be.true;
    done();
  });
});
