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

describe("t2 login api test, test /api/login route : start server\n", () => {
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

describe("Login user - should reject because user database is empty", () => {
  it("login user badUser", function (done) {
    chai.request(app)
      .post(`/api/login`)
      .type('form')
      .send({
        '_method': 'post',
        userName: "badUser",
        password: "anyPassword"
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.status).to.equal(204, "http response code");
        // API returns empty body, using 204 to indicate failure
        expect(res.body).to.be.empty
        done();
      });
  });
});

describe("Login with empty password or userName", () => {
  it("login no password", function (done) {
    chai.request(app)
      .post(`/api/login`)
      .type('form')
      .send({
        '_method': 'post',
        userName: "badUser",
        password: ""
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.status).to.equal(204, "http response code");
        // API returns empty body, using 204 to indicate failure
        expect(res.body).to.be.empty
        done();
      });
  });
  it("login no user name", function (done) {
    chai.request(app)
      .post(`/api/login`)
      .type('form')
      .send({
        '_method': 'post',
        userName: "",
        password: "aPassword"
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.status).to.equal(204, "http response code");
        // API returns empty body, using 204 to indicate failure
        expect(res.body).to.be.empty
        done();
      });
  });
  it("login missing password field", function (done) {
    chai.request(app)
      .post(`/api/login`)
      .type('form')
      .send({
        '_method': 'post',
        userName: "badUser"
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.status).to.equal(204, "http response code");
        // API returns empty body, using 204 to indicate failure
        expect(res.body).to.be.empty
        done();
      });
  });
});

describe("Add aTestUser to db and log in", () => {
  it("Add `'aTestUser' to User database", function (done) {
    db.User
      .create({ 
        userName: "aTestUser",
        password: encPassword
      })
      .then( (dbResult) => {
        // return a pass to mocha as something was created
        expect(true).to.be.true;
        done();
      })
      .catch( (err) => {
        console.log("Error occurred whilst adding user aTestUser to database");
        throw new Error(err);
      })
  });

  it("login should pass, returning JWT", function (done) {
    chai.request(app)
      .post(`/api/login`)
      .type('form')
      .set("Authorization", `Bearer ${jwt}`)
      .send({
        '_method': 'post',
        userName: "aTestUser",
        password: password
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.status).to.equal(200, "http response code");
        // could add further checks that the response object has the right field
        expect(res.body).to.not.be.empty;
        expect(res.body.jwt).to.not.be.empty;
        // test, validate the jwt
        testJwt= res.body.jwt;
        done();
      });
  });

  it("login should be rejected because of wrong password", function (done) {
    chai.request(app)
      .post(`/api/login`)
      .type('form')
      .set("Authorization", `Bearer ${testJwt}`)
      .send({
        '_method': 'post',
        userName: "aTestUser",
        password: "theWrongPassword"
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.status).to.equal(204, "http response code");
        // API returns empty body, using 204 to indicate failure
        expect(res.body).to.be.empty
        done();
      });
  });
  
});