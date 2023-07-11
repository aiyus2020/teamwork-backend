const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../server");

// Configure chai
chai.use(chaiHttp);
chai.should();

describe("User Routes", () => {
  //login route/api
  describe("POST /api/v1/login", () => {
    it("should log in a user and return a success response", (done) => {
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
  });

  // register route/api
  describe("POST /api/v1/register", () => {
    it("should create a new user and return a success response", (done) => {
      const newUser = {
        email: "test@examples.com",
        password: "password",
        firstname: "John",
        lastname: "Doe",
        gender: "Male",
        jobrole: "Developer",
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
