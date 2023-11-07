const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../server"); // Import your Express app
const { describe, it, before } = require("mocha");
const client = require("../models/db"); // Import your database client
const { getGif, getArts } = require("../queries/getArtGifQuery"); // Import your queries

chai.use(chaiHttp);
chai.should();

describe("GetgifArticle", () => {
  // Declare global variables
  let createdGifId;
  let createdArtId;
  let createdUserId;
  let authToken;
  let gif_id;
  let articleId;
  let upload;
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
    // Register a new user
    await chai
      .request(app)
      .post("/api/v1/register")
      .send(newUsers)
      .then(async () => {
        await chai
          // Login the user
          .request(app)
          .post("/api/v1/login")
          .send(loginUser)
          .then((res) => {
            const result = res.body;
            createdUserId = result.data.id;
            authToken = result.data.token; // Grab the token from the user
          });
      });

    const newGif = {
      title: "Test Gif",
      image: "./assets/SmallFullColourGIF.gif",
      comment: "just a comment",
    };
    const gifRes = await chai
      .request(app)
      .post("/api/v1/gifs_upload")
      .set("token", authToken)
      .field("title", newGif.title)
      .field("title", newGif.comment)
      .attach("image", newGif.image)
      .then((res) => {
        gif_id = res.body.data.gifs_id;
      });

    const newArticle = {
      title: "Test article",
      article: "my article",
      comment: "just a comment",
    };
    const articleRes = await chai
      .request(app)
      .post("/api/v1/post_article")
      .set("token", authToken)
      .send(newArticle)
      .then((res) => {
        articleId = res.body.data.articleId;
      });
  });

  // Test the getGif route
  it("should get a GIF by ID", async () => {
    // Use the ID of a created GIF from your test data

    const res = await chai
      .request(app)
      .get(`/api/v1/gif&comment/${gif_Id}`)
      .set("token", authToken);

    res.should.have.status(200);
    res.body.should.be.an("object");
    res.body.should.have.property("status").eql("success");
    res.body.should.have.property("data");
    res.body.data.should.have.property("id");
    res.body.data.should.have.property("createdOn");
    res.body.data.should.have.property("title");
    res.body.data.should.have.property("imageUrl");
    res.body.data.should.have.property("comments").be.an("array");

    // Add more specific assertions for the response data.
  });

  // Test the getArt route
  it("should get an article by ID", async () => {
    // Use the ID of a created article from your test data

    const res = await chai
      .request(app)
      .get(`/api/v1/article&comment/${articleId}`);

    res.should.have.status(200);
    res.body.should.be.an("object");
    res.body.should.have.property("status").eql("success");
    res.body.should.have.property("data");
    res.body.data.should.have.property("id");
    res.body.data.should.have.property("createdOn");
    res.body.data.should.have.property("articletitle");
    res.body.data.should.have.property("article");
    res.body.data.should.have.property("comments").be.an("array");
  });
});
