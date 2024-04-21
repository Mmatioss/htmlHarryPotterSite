const express = require("express");
const UsersController = require("../controllers/UsersController");
const PostController = require("../controllers/PostController");
const authentificationController = require("../controllers/authentificationController");
const AuthMiddleware = require("../middlewares/auth");

const rooter = express.Router();

rooter.get("/users", UsersController.index);
rooter.post("/users", UsersController.store);
rooter.get("/users/:id", UsersController.show);
rooter.put("/users/:id", UsersController.update);
rooter.delete("/users/:id", UsersController.destroy);

rooter.post("/login", authentificationController.login);
rooter.get(
  "/getMyProfile",
  AuthMiddleware.authenticate,
  UsersController.getMyProfile
);

rooter.get("/users/:id/posts", PostController.showPosts);
rooter.post("/users/:id/posts", PostController.createPost);

module.exports = rooter;
