const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../server");
const { describe, it, after } = require("mocha");
const { deleteUserQuery } = require("../queries/userQuery");
const client = require("../models/db");
// Configure chai
chai.use(chaiHttp);
chai.should();

describe("User Routes", () => {
  let createdUserId;

  // Test case for registering a new user and saving the user ID
  it("should create a new user and return a success response", (done) => {
    const newUser = {
      email: "test@examp.com",
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
        res.should.have.status(200);
        res.body.should.be.an("object");
        res.body.should.have.property("status").eql("success");
        res.body.should.have.property("data");
        res.body.data.should.have
          .property("message")
          .eql("user account successfully created");
        res.body.data.should.have.property("token");
        res.body.data.should.have.property("id");

        // Save the created user ID to use it for deletion in the after hook
        createdUserId = res.body.data.id;

        done();
      });
  });

  // Test case for deleting the created user after the test
  after(async () => {
    if (createdUserId) {
      await client.query(deleteUserQuery, [createdUserId]); //perform the delete
    }
  });

  // Test successful login and incorrect password
  it("should log in a user and return a success response", (done) => {
    //successful login test
    const userCredentials = {
      email: "test@examplse.com",
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
  //test for invalid password
  it("should return 401 if the password is invalid", (done) => {
    const invalidPassword = "invalid"; // Invalid password format

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
  //test for invalide email format
  it("should return 401 if the email is invalid", (done) => {
    const invalidEmail = "invalid_email_example.com"; // Invalid email format

    chai
      .request(app)
      .post("/api/v1/login")
      .send({ email: invalidEmail, password: "password" })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("string");
        res.body.should.equal("Invalid email format");

        done();
      });
  });
});
