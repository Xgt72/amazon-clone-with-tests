const Joi = require("joi");

const creation = Joi.object({
  userId: Joi.number().positive().required(),
  paymentIntentId: Joi.string().max(255).required(),
  amount: Joi.number().positive().precision(2).max(99999.99).required(),
  created: Joi.number().integer().positive().max(5),
});

const update = Joi.object({
  id: Joi.number().positive().required(),
  userId: Joi.number().positive(),
  paymentIntentId: Joi.string().max(255),
  amount: Joi.number().positive().precision(2).max(99999.99),
  created: Joi.number().integer().positive().max(5),
}).or("userId", "paymentIntentId", "amount", "created");

module.exports = {
  creation,
  update,
};
