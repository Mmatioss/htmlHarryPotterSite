const prisma = require("../config/prisma");
const { show } = require("./UsersController");

class PostController {
  async showPosts(req, res) {
    try {
      const id = req.params.id;
      const posts = await prisma.post.findMany({
        where: { authorId: Number(id) },
      });
      return res.status(200).send(posts);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }

  async createPost(req, res) {
    try {
      const post = req.body;
      const id = req.params.id;
      const postPosted = await prisma.post.create({
        data: {
          title: post.title,
          content: post.content,
          authorId: Number(id),
        },
      });
      const userPosts = await prisma.post.findMany({
        where: { authorId: Number(id) },
      });
      return res.status(201).send(userPosts);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }
}

module.exports = new PostController();
