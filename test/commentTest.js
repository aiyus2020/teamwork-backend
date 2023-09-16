const chai = require("chai");
const chaiHttp = require("chai-http");
const cloudinary = require("../utlis/cloudinary");
const app = require("../server");
const { findId, deleteGifquery } = require("../queries/gifsQuery");
const { deleteUserQuery } = require("../queries/userQuery");
const {
  deleteArticleComment,
  deleteGifComment,
} = require("../queries/commentQuery");
const { describe, it, before, after } = require("mocha");
const client = require("../models/db");

chai.use(chaiHttp);
chai.should();

describe("Articles", () => {
  // Declaring global variables

  let createdArticleId;
  let createdGifId;
  let createdUserId;
  let authToken; // Authentication token
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
    };
    const gifRes = await chai
      .request(app)
      .post("/api/v1/gifs_upload")
      .set("token", authToken)
      .field("title", newGif.title) // Use .field() correctly to set form field
      .attach("image", newGif.image)
      .then((res) => {
        gif_id = res.body.data.gifs_id;
      });

    const newArticle = {
      title: "Test article",
      article: "my article",
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

  // Test case for creating a comment on a GIF
  it("should create a comment on a GIF", async () => {
    const commentData = {
      comment: "This is a test comment on a GIF",
    };

    const res = await chai
      .request(app)
      .post(`/api/v1/gif_comment/${gif_id}`)
      .set("token", authToken)
      .send(commentData);

    res.should.have.status(200);
    res.body.should.be.an("object");
    res.body.should.have.property("status").eql("success");
    res.body.should.have.property("data");
    res.body.data.should.have
      .property("message")
      .eql("comment successfully created");
    res.body.data.should.have.property("createdOn");
    res.body.data.should.have.property("id");

    res.body.data.should.have.property("giftitle");
    createdGifId = res.body.data.id;

    upload = await client.query(findId, [createdGifId]);
    console.log(upload);
  });

  // Test case for creating a comment on an article
  it("should create a comment on an article", async () => {
    const commentData = {
      comment: "This is a test comment on an article",
    };

    const res = await chai
      .request(app)
      .post(`/api/v1/article_comment/${articleId}`)
      .set("token", authToken)
      .send(commentData);

    res.should.have.status(200);
    res.body.should.be.an("object");
    res.body.should.have.property("status").eql("success");
    res.body.should.have.property("data");
    res.body.data.should.have
      .property("message")
      .eql("comment successfully created");
    res.body.data.should.have.property("createdOn");
    res.body.data.should.have.property("id");

    res.body.data.should.have.property("articletitle");
    res.body.data.should.have.property("article");
    createdArticleId = res.body.data.id;
    console.log(createdArticleId);
  });

  // After all tests, you can clean up any test data if needed
  after(async () => {
    await client.query(deleteArticleComment, [createdArticleId]);
    await client.query(deleteGifComment, [createdGifId]);
    await cloudinary.uploader.destroy(upload.rows[0].cloud_public_id);
    await client.query(deleteGifquery, [createdGifId]);
  });
});
