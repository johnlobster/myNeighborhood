const mongoose = require("mongoose");
const chai = require("chai");
const chaiHttp = require('chai-http');
const expect = require("chai").expect;
chai.use(chaiHttp);

const auth = require("../controller/authentication.js")

let { app, db } = require("../server");

// used to test /api/pingtoken
oldJWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImpEb2UiLCJpYXQiOjE1NjUzMzE3NTUsImV4cCI6MTU2NTUwNDU1NX0.4yZhUAD6Y707syKOqiKSuhabtAB9GYxPXyyCZTTNvAI"
let testJwt = "";

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

describe("t3 register api test, test /api/register route and /api/pingtoken: start server\n", () => {
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
        testJwt = res.body.jwt; // save to use in /api/pingtoken tests
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
        expect(res.body.jwt).to.be.empty;
        expect(res.body.message).to.not.be.empty;
        done();
      });
  });
});

describe("Register with bad inputs", () => {
  it("register without userName", function (done) {
    let newData = Object.assign({}, userSeed[0]);
    delete newData.userName;
    chai.request(app)
      .post(`/api/register`)
      .type('form')
      .send(newData)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.status).to.equal(401, "http response code");
        expect(res.body).to.not.be.empty;
        expect(res.body.jwt).to.be.empty;
        expect(res.body.message).to.not.be.empty;
        done();
      });
  });
  it("register without password", function (done) {
    let newData = Object.assign({}, userSeed[0]);
    delete newData.password;
    chai.request(app)
      .post(`/api/register`)
      .type('form')
      .send(newData)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.status).to.equal(401, "http response code");
        expect(res.body).to.not.be.empty;
        expect(res.body.jwt).to.be.empty;
        expect(res.body.message).to.not.be.empty;
        done();
      });
  });
  it("register with empty userName", function (done) {
    let newData = Object.assign({}, userSeed[0]);
    newData.userName = "";
    chai.request(app)
      .post(`/api/register`)
      .type('form')
      .send(newData)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.status).to.equal(401, "http response code");
        expect(res.body).to.not.be.empty;
        expect(res.body.jwt).to.be.empty;
        expect(res.body.message).to.not.be.empty;
        done();
      });
  });
  it("register with empty password", function (done) {
    let newData = Object.assign({}, userSeed[0]);
    newData.password = "";
    chai.request(app)
      .post(`/api/register`)
      .type('form')
      .send(newData)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.status).to.equal(401, "http response code");
        expect(res.body).to.not.be.empty;
        expect(res.body.jwt).to.be.empty;
        expect(res.body.message).to.not.be.empty;
        done();
      });
  });
});

describe("Test /api/pingtoken route", () => {
  it("ping with no token", function (done) {
    chai.request(app)
      .get(`/api/pingtoken`)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.status).to.equal(200, "http response code");
        expect(res.body).to.not.be.empty;
        expect(res.body.jwtValid).to.equal(false);
        done();
      });
  });
  it("ping with token", function (done) {
    // token obtained from login
    chai.request(app)
      .get(`/api/pingtoken`)
      .set("Authorization", `Bearer ${testJwt}`)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.status).to.equal(200, "http response code");
        expect(res.body).to.not.be.empty;
        expect(res.body.jwtValid).to.equal(true);
        done();
      });
  });
  it("ping with old token", function (done) {
    // token obtained from login
    chai.request(app)
      .get(`/api/pingtoken`)
      .set("Authorization", `Bearer ${oldJWT}`)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.status).to.equal(200, "http response code");
        expect(res.body).to.not.be.empty;
        expect(res.body.jwtValid).to.equal(false);
        done();
      });
  });
});



