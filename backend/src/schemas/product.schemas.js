const Joi = require("joi");

const creation = Joi.object({
  title: Joi.string().min(3).max(255).required(),
  price: Joi.number().positive().precision(2).max(99999.99).required(),
  image: Joi.string().max(255),
  rating: Joi.number().integer().positive().max(5),
});

const update = Joi.object({
  id: Joi.number().required(),
  title: Joi.string().min(3).max(255),
  price: Joi.number().positive().precision(2).max(99999.99),
  image: Joi.string().max(255),
  rating: Joi.number().integer().positive().max(5),
}).or("title", "price", "image", "rating");

module.exports = {
  creation,
  update,
};
