import myBcrypt from "../utils/bcrypt.js";
import myJwt from "../utils/jwt.js";

export default class AuthentificationController {
  async login(req, res) {
    try {
      const body = req.body;

      const user = await global.prisma.user.findUnique({
        where: {
          email: body.email,
        },
      });

      if (user === null) {
        return res.status(404).send("User not found");
      }

      const isSamePassword = await myBcrypt.comparePassword(
        body.password,
        user.password
      );

      console.log(isSamePassword);
      if (!isSamePassword) {
        return res.status(401).send("Unauthorized");
      }

      // ICI ON GENERE UN TOKEN
      const token = myJwt.generateToken(user);

      return res.status(200).send({ user, token });
    } catch (e) {
      return res.status(500).send({
        message: e.message,
      });
    }
  }
}
