// import ip from "ip";
import ip from "ip";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import rooter from "./router/root.js";

import { PrismaClient } from "@prisma/client";

global.prisma = new PrismaClient();

const ipAddr = ip.address();

const app = express();
const port = 3000;

let lastHouseVisited = "Slytherin";

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/", rooter);

app.get("/", (req, res) => {
  res.json({ house: lastHouseVisited });
});
app.post("/", (req, res) => {
  lastHouseVisited = req.body.house;
  res.json({ house: lastHouseVisited });
});
app.listen(3000, () => {
  console.log("Server run : http://" + ipAddr + ":3000");
});

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });

// /users en GET pour prend touts les users
// /users en POST pour ajouter un user
// /users/:id en GET pour prendre un seul user
// /users/:id en PUT pour modifier un user
// /users/:id en DELETE pour supprimer un user
