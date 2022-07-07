const models = require("../models");
const schemas = require("../schemas");

class CommandController {
  static browse = async (req, res) => {
    try {
      const [rows] = await models.command.findAll();
      return res.send(rows);
    } catch (err) {
      return res.sendStatus(500);
    }
  };

  static read = async (req, res, next) => {
    const id = req.command ? req.command.id : parseInt(req.params.id, 10);

    try {
      const [[command]] = await models.command.findOneById(id);
      if (!command) {
        return res.sendStatus(404);
      }

      if (req.method === "PUT") {
        req.id = id;
        return next();
      }

      if (req.method === "POST") {
        return res.status(201).send(command);
      }

      return res.status(200).send(command);
    } catch (err) {
      return res.sendStatus(500);
    }
  };

  static add = async (req, res, next) => {
    const command = req.body;

    try {
      const [result] = await models.command.insertOne(command);
      const [[commandCreated]] = await models.command.findOneById(
        result.insertId
      );

      req.command = commandCreated;
      return next();
    } catch (err) {
      console.error(err.message);
      return res.sendStatus(500);
    }
  };

  static edit = async (req, res) => {
    const command = req.body;

    try {
      const [result] = await models.command.updateOne(req.id, command);

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
      const [result] = await models.command.deleteOne(id);
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
    const { error } = schemas.command.creation.validate(req.body);
    if (error) {
      console.error(error);
      return res.status(400).send(`${error.details[0].context.key} is wrong`);
    }
    return next();
  };

  static validateUpdateData = async (req, res, next) => {
    req.body.id = parseInt(req.params.id, 10);
    const { error } = schemas.command.update.validate(req.body);
    if (error) {
      return res.status(400).send("You must provide valid data");
    }
    return next();
  };
}

module.exports = CommandController;
