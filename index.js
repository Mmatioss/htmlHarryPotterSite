const rooter = require("./router/root");
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use("/", rooter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// /users en GET pour prend touts les users
// /users en POST pour ajouter un user
// /users/:id en GET pour prendre un seul user
// /users/:id en PUT pour modifier un user
// /users/:id en DELETE pour supprimer un user
