//import all libraries and files
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../server");
const { describe, it, after } = require("mocha");
const { deleteGifquery } = require("../queries/gifsQuery");
const cloudinary = require("../utlis/cloudinary");
const client = require("../models/db");

chai.use(chaiHttp);
chai.should();

// test for uploading and deleting gifs
describe("GifsController", () => {
  //declearing global variablies
  let createdGifId;
  let testPublicId;
  let authToken; // Authentication token

  before(async () => {
    const newUsers = {
      email: "test@example.com",
      password: "password",
      firstName: "John",
      lastName: "Doe",
      gender: "Male",
      jobRole: "Developer",
      department: "IT",
      address: "123 Main St",
    };
    const loginUser = {
      email: "test@example.com",
      password: "password",
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
          });
      });
  });

  // Test case for uploading a new gif and returning success
  it("should create a new gif and return success", async () => {
    const newGif = {
      title: "Test Gif",
      image: "C:/Users/User/Downloads/SmallFullColourGIF.gif", // Replace with the path to your test gif file
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

  // Test case for deleting the created gif and returning success
  it("should delete the created gif and return success", async () => {
    // Ensure that you have a valid 'createdGifId' to delete
    if (!createdGifId) {
      throw new Error("No gif created to delete");
    }

    // Make the HTTP request with the auth token
    const res = await chai
      .request(app)
      .delete(`/api/v1/deletegifs/${createdGifId}`)
      .set("token", ` ${authToken}`);

    res.should.have.status(200);
    res.body.should.be.an("object");
    res.body.should.have.property("status").eql("success");
    res.body.should.have.property("data");
    res.body.data.should.have
      .property("message")
      .eql("gifs post successfully deleted");
  });

  // Clean up after the test
  after(async () => {
    if (createdGifId) {
      await client.query(deleteGifquery, [createdGifId]);
    }

    // Delete the image from Cloudinary
    if (testPublicId) {
      await cloudinary.uploader.destroy(testPublicId);
    }
  });
});
