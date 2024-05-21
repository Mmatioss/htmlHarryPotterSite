import jsonwebtoken from "jsonwebtoken";

export default class AuthMiddleware {
  async authenticate(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    console.log("Authenticating token: ", token);

    if (token == null) return res.sendStatus(401);

    jsonwebtoken.verify(token, process.env.JWT_SECRET, async (err, payload) => {
      console.log(err);

      if (err) return res.sendStatus(405);

      const email = payload.email;

      const user = await global.prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) return res.sendStatus(403);

      req.user = user;

      next();
    });
  }
}
