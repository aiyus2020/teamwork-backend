const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../server");
const { describe } = require("mocha");

// Configure chai
chai.use(chaiHttp);
chai.should();

describe("User Routes", () => {
  //login route/api
  describe("POST /api/v1/login", () => {
    it("should log in a user and return a success response and also return 401 if the password is incorrect", (done) => {
      const userCredentials = {
        email: "test@example.com",
        password: "password",
      };

      chai
        .request(app)
        .post("/api/v1/login")
        .send(userCredentials)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an("object");
          res.body.should.have.property("status").eql("success");
          res.body.should.have.property("data");
          res.body.data.should.have
            .property("message")
            .eql("user account successfully login");
          res.body.data.should.have.property("token");
          res.body.data.should.have.property("id");

          done();
        });
    });
    // test for incorrect password
    describe("POST /api/v1/login", () => {
      it("should return 401 if the password is incorrect", (done) => {
        const invalidPassword = "incorrectPassword";

        chai
          .request(app)
          .post("/api/v1/login")
          .send({ email: "test@example.com", password: invalidPassword })
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.be.a("string");
            res.body.should.equal("password or email is incorrect");

            done();
          });
      });
    });
  });

  // register route/api
  describe("POST /api/v1/register", () => {
    it("should create a new user and return a success response", (done) => {
      const newUser = {
        email: "test@exampsel.com",
        password: "password",
        firstName: "John",
        lastName: "Doe",
        gender: "Male",
        jobRole: "Developer",
        department: "IT",
        address: "123 Main St",
      };
      chai
        .request(app)
        .post("/api/v1/register")
        .send(newUser)
        .end((err, res) => {
          res.body.should.be.an("object");
          res.body.should.have.property("status").eql("success");
          res.body.should.have.property("data");
          res.body.data.should.have
            .property("message")
            .eql("user account successfully created");
          res.body.data.should.have.property("token");
          res.body.data.should.have.property("id");

          done();
        });
    });
  });
});
