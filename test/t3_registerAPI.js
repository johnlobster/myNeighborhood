const mongoose = require("mongoose");
const chai = require("chai");
const chaiHttp = require('chai-http');
const expect = require("chai").expect;
chai.use(chaiHttp);

const auth = require("../controller/authentication.js")

let { app, db } = require("../server");

// create a valid password for testing
const password = "123456"
let encPassword = "";
// don't have to wait for completion as server startup has a delay built in
auth.encodePassword(password)
  .then( (encPw) => {
    encPassword = encPw;
  })
  .catch( (err) => {
    throw new Error(err);
  });

// used to test authentication, not part of the /login route testing
let jwt ="";
let testJwt = "";
auth.getJWT({ userId: "aTestUser"})
  .then( (token) => {
    jwt = token;
  })
  .catch( (err) => {
    throw new Error(err);
  });

const userSeed = [
  {
    userName: "jDoe",
    password: "123456",
    firstName: "John",
    lastName: "Doe",
    email: "jdoe101@hotmail.com",
    address: "7501 Folsom Auburn Rd",
  }
]

describe("t3 register api test, test /api/register route : start server\n", () => {
  it("Server should start", (done) => {
    // wait for server to start before doing anything
    setTimeout(() => {
      // app should have lots of data in it, just check that it isn't still a blank object
      expect(typeof (app.settings)).to.equal("object");
      done();
    }, 1500);
  });
  it("Empty User database\n", (done) => {
    // remove records from database
    db.User.bulkWrite([{ deleteMany: { filter: {} } }])
      .then((dbModel) => {
        expect(dbModel.result.ok).to.equal(1);
        if (dbModel.deletedCount > 0) {
          console.log("Warning - database was not empty, possible previous failed tests");
        }
        done();
      })
      .catch(err => {
        console.log("Error occurred whilst resetting database");
        throw new Error(err);
      });
  });
});

describe("Register user - should pass", () => {
  it("register user jDoe", function (done) {
    chai.request(app)
      .post(`/api/register`)
      .type('form')
      .send(userSeed[0])
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.status).to.equal(200, "http response code");
        expect(res.body).to.not.be.empty;
        expect(res.body.jwt).to.not.be.empty;
        expect(res.body.userData).to.not.be.empty;
        expect(res.body.userData.userName).to.equal("jDoe");
        expect(res.body.message).to.equal("success");
        done();
      });
  });
});

describe("Register duplicate user - should fail", () => {
  it("register user jDoe (again)", function (done) {
    chai.request(app)
      .post(`/api/register`)
      .type('form')
      .send(userSeed[0])
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.status).to.equal(401, "http response code");
        expect(res.body).to.not.be.empty;
        expect(res.body.message).to.equal("User name already exists");
        done();
      });
  });
});



