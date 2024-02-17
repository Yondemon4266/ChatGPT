const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: "./config/.env" });

const chatRoutes = require("./routes/chat.routes.js");
const bodyParser = require("body-parser");

const server = express();
const port = process.env.SERVER_PORT;

const corsOptions = {
  origin: [process.env.CLIENT_URL],
  credentials: true,
  allowedHeaders: ["sessionId", "Content-Type"],
  exposedHeaders: ["sessionId"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cors(corsOptions));

server.use("/", chatRoutes);

server.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});

module.exports = server;
