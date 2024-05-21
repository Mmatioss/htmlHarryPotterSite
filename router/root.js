import express from "express";
import UsersController from "../controllers/UsersController.js";
import PostController from "../controllers/PostController.js";
import authentificationController from "../controllers/authentificationController.js";
import AuthMiddleware from "../middlewares/auth.js";

const rooter = express.Router();

rooter.get("/users", new UsersController().index);
rooter.post("/users", new UsersController().store);
rooter.get("/users/:id", new UsersController().show);
rooter.put("/users/:id", new UsersController().update);
rooter.delete("/users/:id", new UsersController().destroy);

rooter.post("/login", new authentificationController().login);
rooter.get(
  "/getMyProfile",
  new AuthMiddleware().authenticate,
  new UsersController().getMyProfile
);
rooter.get(
  "/getMyCard",
  new AuthMiddleware().authenticate,
  new UsersController().getMyCard
);
rooter.get(
  "/openBlister",
  new AuthMiddleware().authenticate,
  new UsersController().openBlister
);

rooter.get("/users/:id/posts", new PostController().showPosts);
rooter.post("/users/:id/posts", new PostController().createPost);

export default rooter;
