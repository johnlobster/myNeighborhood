const mongoose = require("mongoose");
const chai = require("chai");
const chaiHttp = require('chai-http');
const expect = require("chai").expect;
chai.use(chaiHttp);

const moment = require("moment");

let { app, db } = require("../server");

const userSeed = [
  {
    userName: "jDoe",
    password: "123456",
    firstName: "John",
    lastName: "Doe",
    email: "jdoe101@hotmail.com",
    address: "7501 Folsom Auburn Rd",
  }
];

const alertSeed = [
  // active alert
  {
    userName: "jDoe",
    title: "accident at Folsom Auburn/Greenback",
    expiresDate: moment().add(4, "hours").toDate(),
    createdDate: moment().toDate(),
    message: "PD says will be cleared in 4 hours"
  },
  // old alert
  {
    userName: "jDoe",
    title: "Roadworks on Folsom Auburn",
    expiresDate: moment().subtract(20, "hours").toDate(),
    createdDate: moment().subtract(24, "hours").toDate(),
    message: "Evenings only"
  }
];

describe("t4 alert api test, test /api/alert post and get routes: start server\n", () => {
  it("Server should start", (done) => {
    // wait for server to start before doing anything
    setTimeout(() => {
      // app should have lots of data in it, just check that it isn't still a blank object
      expect(typeof (app.settings)).to.equal("object");
      done();
    }, 1500);
  });
  it("Empty Alert and User databases\n", (done) => {
    // remove records from database
    db.Alert.bulkWrite([{ deleteMany: { filter: {} } }])
      .then((dbModel) => {
        expect(dbModel.result.ok).to.equal(1);
        if (dbModel.deletedCount > 0) {
          console.log("Warning - Alert database was not empty, possible previous failed tests");
        }
        return db.User.bulkWrite([{ deleteMany: { filter: {} } }]);
      })
      .then((dbModel2) => {
        expect(dbModel2.result.ok).to.equal(1);
        if (dbModel2.deletedCount > 0) {
          console.log("Warning - User database was not empty, possible previous failed tests");
        }
      })
      .catch(err => {
        console.log("Error occurred whilst resetting database");
        throw new Error(err);
      })
      .finally( () => {
        done();
      });      
  });
});

tempJwt = "";

describe("http GET with empty database", () => {
  it("get /api/alerts", function (done) {
    chai.request(app)
      .get(`/api/alerts`)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.status).to.equal(200, "http response code");
        expect(res.body).to.be.empty;
        expect(res.body.length).to.equal(0);
        done();
      });
  });
});

describe("Post alert without authorization - should fail", () => {
  it("post to /api/alerts", function (done) {
    chai.request(app)
      .post(`/api/alerts`)
      .type('form')
      .send(alertSeed[0])
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.status).to.equal(401, "http response code");
        expect(res.body).to.not.be.empty;
        expect(res.body.message).to.not.be.empty;
        done();
      });
  });
});

// register a user to get valid jwt
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
        tempJwt = res.body.jwt; // save to use in /api/pingtoken tests
        done();
      });
  });
});

describe("Post alert with authorization - should succeed", () => {
  it("post to /api/alerts", function (done) {
    chai.request(app)
      .post(`/api/alerts`)
      .type('form')
      .set("Authorization", `Bearer ${tempJwt}`)
      .send(alertSeed[0])
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.status).to.equal(200, "http response code");
        expect(res.body).to.not.be.empty;
        expect(res.body.message).to.equal("success");
        done();
      });
  });
});

describe("get with item in database", () => {
  it("get /api/alerts", function (done) {
    chai.request(app)
      .get(`/api/alerts`)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.status).to.equal(200, "http response code");
        expect(res.body).to.not.be.empty;
        expect(res.body.length).to.equal(1);
        done();
      });
  });
  
});



