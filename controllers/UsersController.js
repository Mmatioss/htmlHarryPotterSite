const prisma = require("../config/prisma");
const { hashPassword } = require("../utils/bcrypt");

class UsersController {
  async getMyProfile(req, res) {
    const user = req.user;
    return res.status(200).send(user);
  }

  async index(req, res) {
    try {
      const users = await prisma.user.findMany();
      return res.status(200).send(users);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }

  async store(req, res) {
    try {
      const user = req.body;
      const users = await prisma.user.create({
        data: {
          name: user.name,
          email: user.email,
          password: await hashPassword(user.password),
        },
      });
      return res.status(201).send(users);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }

  async show(req, res) {
    try {
      const id = req.params.id;
      const user = await prisma.user.findUnique({
        where: { id: Number(id) },
      });
      if (!user) {
        return res.status(404).send("User not found");
      }
      return res.status(200).send(user);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }

  async update(req, res) {
    try {
      const newName = req.body.name;
      const id = req.params.id;
      const user = await prisma.user.update({
        where: { id: Number(id) },
        data: { name: newName },
      });
      if (!user) {
        return res.status(404).send("User not found");
      }
      return res.status(200).send(user);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }

  async destroy(req, res) {
    try {
      const id = req.params.id;
      const user = await prisma.user.delete({
        where: { id: Number(id) },
      });

      if (!user) {
        return res.status(404).send("User not found");
      }
      const users = await prisma.user.findMany();
      return res.status(200).send(users);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }
}

module.exports = new UsersController();
