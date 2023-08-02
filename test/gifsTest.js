const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../server"); // Assuming this is your Express app
const { describe, it, after } = require("mocha");
const {
  newGifsQuery,
  findId,
  deleteGifquery,
} = require("../queries/gifsQuery");
const cloudinary = require("../utlis/cloudinary");
const client = require("../models/db");
const authenticate = require("../middleware/authmiddleware");
const jwtGenerator = require("../utlis/jwtGenerator");
chai.use(chaiHttp);
chai.should();

describe("GifsController", () => {
  let createdGifId;
  let testPublicId;
  let authToken; // Authentication token
  let token;
  before(() => {
    // Perform authentication and get the auth token before running the tests

    // ...

    // Mock the authentication and return a valid JWT token

    // Perform authentication and get the JWT token
    // Replace the following line with your actual authentication logic
    token = jwtGenerator(); // Make sure userCredentials is passed here
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
      .set(token)
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
      .set("Authorization", `Bearer ${authToken}`);

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
