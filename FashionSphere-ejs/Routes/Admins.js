const express = require("express");
const { Create, readAll, readSingle, Update,Delete } = require("../Contrôleurs/AdminController");
const Router = express.Router();

Router.route("/")
     .post(Create)
     .get(readAll)

Router.route("/:id")
     .get(readSingle)
     .put(Update)
     .delete(Delete);
     
module.exports = Router;