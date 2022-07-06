const models = require("../models");
const schemas = require("../schemas");

class ProductController {
  static browse = (req, res) => {
    models.product
      .findAll()
      .then(([rows]) => {
        res.send(rows);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static read = (req, res, next) => {
    const id = req.product ? req.product.id : parseInt(req.params.id, 10);

    models.product
      .findOneById(id)
      .then(([rows]) => {
        if (rows[0] == null) {
          return res.sendStatus(404);
        }

        if (req.method === "PUT") {
          req.id = id;
          return next();
        }

        if (req.method === "POST") {
          return res.status(201).send(rows[0]);
        }

        return res.send(rows[0]);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static add = async (req, res, next) => {
    const product = req.body;

    try {
      const [result] = await models.product.insertOne(product);
      const [[productCreated]] = await models.product.findOneById(
        result.insertId
      );

      req.product = productCreated;
      return next();
    } catch (err) {
      console.error(err.message);
      return res.sendStatus(500);
    }
  };

  static edit = async (req, res) => {
    const product = req.body;

    try {
      const [result] = await models.product.updateOne(req.id, product);

      if (result.affectedRows === 0) {
        return res.sendStatus(404);
      }

      return res.sendStatus(204);
    } catch (err) {
      console.error(err.message);
      return res.sendStatus(500);
    }
  };

  static deleteOne = async (req, res) => {
    const id = parseInt(req.params.id, 10);

    try {
      const [result] = await models.product.deleteOne(id);
      if (result.affectedRows === 0) {
        return res.sendStatus(404);
      }
      return res.sendStatus(204);
    } catch (err) {
      console.error(err.message);
      return res.sendStatus(500);
    }
  };

  static validateCreationData = async (req, res, next) => {
    const { error } = schemas.product.creation.validate(req.body);
    if (error) {
      console.error(error);
      return res.status(400).send(`${error.details[0].context.key} is wrong`);
    }
    return next();
  };

  static validateUpdateData = async (req, res, next) => {
    req.body.id = parseInt(req.params.id, 10);
    const { error } = schemas.product.update.validate(req.body);
    if (error) {
      const { key } = error.details[0].context;
      return res
        .status(400)
        .send(
          key === "password" || key === "id"
            ? `${error.details[0].context.key} is wrong`
            : "You must provide valid data"
        );
    }
    return next();
  };
}

module.exports = ProductController;
