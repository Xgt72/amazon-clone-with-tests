const models = require("../models");
// const schemas = require("../schemas");

class BasketController {
  static getAllByCommandId = async (req, res) => {
    const commandId = parseInt(req.params.commandId, 10);
    try {
      const [baskets] = await models.basket.findAllByCommandId(commandId);
      if (baskets.length === 0) {
        return res.sendStatus(404);
      }
      if (req.method === "POST") {
        return res.status(201).send(baskets);
      }
      return res.status(200).send(baskets);
    } catch (err) {
      console.error(err.message);
      return res.sendStatus(500);
    }
  };

  static getAllCommandsAndBasketsByUserId = async (req, res) => {
    const userId = parseInt(req.params.id, 10);
    try {
      const [commands] = await models.command.findAllWithBasketsByUserId(
        userId
      );
      const allCommandsWithBasketLines = [];
      commands.forEach((command) => {
        const indexOfCommand = allCommandsWithBasketLines.findIndex(
          (item) => item.id === command.id
        );
        if (indexOfCommand !== -1) {
          allCommandsWithBasketLines[indexOfCommand].baskets.push({
            id: command.productId,
            quantity: command.quantity,
            title: command.title,
            price: command.price,
            image: command.image,
            rating: command.rating,
          });
        } else {
          allCommandsWithBasketLines.push({
            id: command.id,
            paymentIntentId: command.paymentIntentId,
            amount: command.amount,
            created: command.created,
            baskets: [
              {
                id: command.productId,
                quantity: command.quantity,
                title: command.title,
                price: command.price,
                image: command.image,
                rating: command.rating,
              },
            ],
          });
        }
      });
      return res.status(200).send(allCommandsWithBasketLines);
    } catch (err) {
      console.error(err.message);
      return res.sendStatus(500);
    }
  };

  static createMultiple = async (req, res, next) => {
    let { baskets } = req.body;
    const commandId = parseInt(req.params.commandId, 10);

    baskets = baskets.map((basket) => {
      return { commandId, ...basket };
    });

    try {
      const [data] = await models.basket.insertMultiple(baskets);
      req.id = data.insertId;
      return next();
    } catch (err) {
      console.error(err.message);
      return res.sendStatus(500);
    }
  };

  static updateOneById = async (req, res, next) => {
    const basket = req.body;
    const commandId = parseInt(req.params.commandId, 10);
    const id = parseInt(req.params.id, 10);

    try {
      const [data] = await models.basket.updateOne(id, {
        ...basket,
        commandId,
      });

      if (data.affectedRows === 0) {
        return res.sendStatus(404);
      }

      return next();
    } catch (err) {
      return res.sendStatus(500);
    }
  };
}

module.exports = BasketController;
