const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");

class App {
  expressServer;

  constructor(init) {
    this.expressServer = express();
    this.expressServer.use(express.json());

    dotenv.config();

    this.initializeControllersRoutes(init.controllers);
    this.databaseConection();
  }

  initializeControllersRoutes(controllers) {
    controllers.forEach((controller) => {
      this.expressServer.use("", controller.router);
    });
  }

  databaseConection() {
    mongoose.connect(
      process.env.DATABASE_URL,
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => {
        console.log("Banco de dados conectados");
      }
    );
  }

  listen() {
    this.expressServer.listen(process.env.PORT, () => {
      console.log(
        `${process.env.APP_NAME} listen on ${process.env.APP_URL}:${process.env.PORT}`
      );
    });
  }
}

module.exports = App;
