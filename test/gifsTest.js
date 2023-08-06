//import all libraries and files
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../server");
const { describe, it, before } = require("mocha");
const { deleteUserQuery } = require("../queries/userQuery");
const client = require("../models/db");
chai.use(chaiHttp);
chai.should();

// test for uploading and deleting gifs
describe("GifsController", () => {
  //declearing global variablies
  let createdGifId;
  let createdUserId;
  let authToken; // Authentication token

  before(async () => {
    const newUsers = {
      email: "test@examples.com",
      password: "password",
      firstName: "John",
      lastName: "Doe",
      gender: "Male",
      jobRole: "Developer",
      department: "IT",
      address: "123 Main St",
    };
    const loginUser = {
      email: newUsers.email,
      password: newUsers.password,
    };
    //register a new user
    await chai
      .request(app)
      .post("/api/v1/register")
      .send(newUsers)
      .then(async () => {
        await chai
          //login the user
          .request(app)
          .post("/api/v1/login")
          .send(loginUser)
          .then((res) => {
            const result = res.body;
            authToken = result.data.token; //grab the token from the user
            createdUserId = result.data.id;
          });
      });
  });

  // Test case for uploading a new gif and returning success
  it("should create a new gif and return success", async () => {
    const newGif = {
      title: "Test Gif",
      image: "../assets/SmallFullColourGIF.gif",
    };

    // Make the HTTP request with the auth token
    const res = await chai
      .request(app)
      .post("/api/v1/gifs_upload")
      .set("token", authToken) //use the token
      .field("title", newGif.title)
      .attach("image", newGif.image);

    res.should.have.status(200);
    res.body.should.be.an("object");
    res.body.should.have.property("status").eql("success");
    res.body.should.have.property("data");
    res.body.data.should.have.property("gifs_id");
    res.body.data.should.have
      .property("message")
      .eql("gif image successfully posted");
    res.body.data.should.have.property("createdOn");
    res.body.data.should.have.property("title").eql(newGif.title);
    res.body.data.should.have.property("imageUrl");

    createdGifId = res.body.data.gifs_id;
    testPublicId = res.body.data.imageUrl; // Store the public_id for deletion in the next test
  });
  after(async () => {
    if (createdUserId) {
      await client.query(deleteUserQuery, [createdUserId]); // Perform the delete
    }
  });
  // Test case for deleting the created gif and returning success
  it("should delete the created gif and return success", async () => {
    // Make the HTTP request with the auth token
    const res = await chai
      .request(app)
      .delete(`/api/v1/deletegifs/${createdGifId}`)
      .set("token", authToken);

    res.should.have.status(200);
    res.body.should.be.an("object");
    res.body.should.have.property("status").eql("success");
    res.body.should.have.property("data");
    res.body.data.should.have
      .property("message")
      .eql("gifs post successfully deleted");
  });
});
