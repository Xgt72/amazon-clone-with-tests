const models = {};

models.user = require("./User.model");
models.userRole = require("./UserRole.model");
models.product = require("./Product.model");
models.command = require("./Command.model");
models.basket = require("./Basket.model");

module.exports = models;
