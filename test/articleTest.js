const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../server");
const { deleteUserQuery } = require("../queries/userQuery");

const { describe, it, before } = require("mocha");
const client = require("../models/db");

chai.use(chaiHttp);
chai.should();

describe("articles", () => {
  //declearing global variablies
  let createdArticleId;
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
            createdUserId = result.data.id;
            authToken = result.data.token; //grab the token from the user
          });
      });
  });
  // Test case for uploading a new gif and returning success
  it("should create a new post and return success", async () => {
    const newArticle = {
      title: "Test article",
      article: "my article",
    };

    // Make the HTTP request with the auth token
    const res = await chai
      .request(app)
      .post("/api/v1/post_article")
      .set("token", authToken) //use the token
      .field(newArticle);

    res.should.have.status(200);
    res.body.should.be.an("object");
    res.body.should.have.property("status").eql("success");
    res.body.should.have.property("data");

    res.body.data.should.have
      .property("message")
      .eql("article successfully posted");
    res.body.data.should.have.property("articleId");
    res.body.data.should.have.property("article");
    res.body.data.should.have.property("title");
    res.body.data.should.have.property("createdOn");

    createdArticleId = res.body.data.articleId;
  });
  it("should update the article and return success", async () => {
    const updateArticle = {
      title: "update article",
      article: "new article",
    };
    const res = await chai
      .request(app)
      .patch(`/api/v1/update_article/${createdArticleId}`)
      .set("token", authToken) //use the token
      .field(updateArticle);

    res.should.have.status(200);
    res.body.should.be.an("object");
    res.body.should.have.property("status").eql("success");
    res.body.should.have.property("data");
    res.body.data.should.have
      .property("message")
      .eql("Article successfully updated");
    res.body.data.should.have.property("title");
    res.body.data.should.have.property("article");
  });
  it("should delete the created post and return success", (done) => {
    // Make the HTTP request with the auth token
    chai
      .request(app)
      .delete(`/api/v1/delete_article/${createdArticleId}`)
      .set("token", authToken)
      .end((err, res) => {
        res.body.should.be.an("object");
        res.body.should.have.property("status").eql("success");
        res.body.should.have.property("data");
        res.body.data.should.have
          .property("message")
          .eql("article deleted successfully");
        done();
      });
  });
});
