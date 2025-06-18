const express = require("express");
const { add, readcart,deleteitem } = require("../Contrôleurs/CartController");
const Router = express.Router();

Router.route("/")
     .get(readcart)
     .post(add)

Router.route("/:id")
     .delete(deleteitem);

module.exports = Router;