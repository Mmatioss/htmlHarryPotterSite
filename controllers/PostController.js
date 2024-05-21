export default class PostController {
  async showPosts(req, res) {
    try {
      const id = req.params.id;
      const posts = await global.prisma.post.findMany({
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
      const postPosted = await global.prisma.post.create({
        data: {
          title: post.title,
          content: post.content,
          authorId: Number(id),
        },
      });
      const userPosts = await global.prisma.post.findMany({
        where: { authorId: Number(id) },
      });
      return res.status(201).send(userPosts);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }
}
