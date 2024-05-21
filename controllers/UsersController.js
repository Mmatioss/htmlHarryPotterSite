import myBcrypt from "../utils/bcrypt.js";

export default class UsersController {
  async getMyProfile(req, res) {
    const user = req.user;
    return res.status(200).send(user);
  }

  async getMyCard(req, res) {
    const houseCard = req.query.house;
    const user = req.user;
    let cards = null;
    if (houseCard === "null") {
      cards = await global.prisma.carde.findMany({
        where: {
          idUser: user.id,
        },
      });
    } else {
      cards = await global.prisma.carde.findMany({
        where: {
          idUser: user.id,
          house: houseCard,
        },
      });
    }
    return res.status(200).send(cards);
  }

  async openBlister(req, res) {
    let lstCharacter = await fetch("https://hp-api.lainocs.fr/characters").then(
      (response) => response.json()
    );
    let monAlea = Math.floor(Math.random() * lstCharacter.length);
    let monTirage = lstCharacter[monAlea];
    await global.prisma.carde.create({
      data: {
        carde: monTirage.slug,
        house: monTirage.house,
        idUser: req.user.id,
      },
    });
    return res.status(200).send(monTirage);
  }

  async index(req, res) {
    try {
      const users = await global.prisma.user.findMany();
      return res.status(200).send(users);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }

  async store(req, res) {
    try {
      const user = req.body;
      const users = await global.prisma.user.create({
        data: {
          name: user.name,
          email: user.email,
          password: await myBcrypt.hashPassword(user.password),
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
      const user = await global.prisma.user.findUnique({
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
      const user = await global.prisma.user.update({
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
      const user = await global.prisma.user.delete({
        where: { id: Number(id) },
      });

      if (!user) {
        return res.status(404).send("User not found");
      }
      const users = await global.prisma.user.findMany();
      return res.status(200).send(users);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }
}
