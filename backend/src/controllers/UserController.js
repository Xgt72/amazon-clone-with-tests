const models = require("../models");
const schemas = require("../schemas");

class UserController {
  static browse = (req, res) => {
    models.user
      .findAll()
      .then(([rows]) => {
        res.send(rows);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static read = (req, res) => {
    models.user
      .findOneById(req.params.id)
      .then(([rows]) => {
        if (rows[0] == null) {
          res.sendStatus(404);
        } else {
          res.send(rows[0]);
        }
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static readByEmail = (req, res, next) => {
    models.user
      .findByEmail(req.body.email)
      .then(([rows]) => {
        // console.debug(rows);
        if (!rows.length) {
          next();
        } else {
          res.sendStatus(409);
        }
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static readWithRoles = async (req, res, next) => {
    const id = req.params.id ? parseInt(req.params.id, 10) : req.user.id;

    try {
      const [results] = await models.user.findOneWithRoles(id);

      if (!results.length) {
        return res.status(404).send("User not found");
      }

      const user = {
        id: results[0].id,
        username: results[0].username,
        email: results[0].email,
        roles: results.map((role) => ({
          id: role.roleId,
          title: role.title,
          code: role.code,
        })),
      };

      if (req.params.id) {
        return res.status(200).json(user);
      }

      if (req.method === "POST" && req.route.path === "/register") {
        return res.status(201).json(user);
      }

      req.user = user;
      return next();
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };

  static add = async (req, res, next) => {
    const user = req.body;

    try {
      const hashedPassword = await models.user.hashPassword(user.password);

      delete user.password;
      user.hashedPassword = hashedPassword;

      const [result] = await models.user.insertOne(user);
      const [[userCreated]] = await models.user.findOneById(result.insertId);

      delete userCreated.hashedPassword;

      req.user = userCreated;
      return next();
    } catch (err) {
      console.error(err.message);
      return res.sendStatus(500);
    }
  };

  static edit = async (req, res) => {
    const user = req.body;

    try {
      const hashedPassword = await models.user.hashPassword(user.password);
      user.hashedPassword = hashedPassword;
      delete user.password;

      const [result] = await models.user.updateOne(user);

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
    try {
      const [result] = await models.user.deleteOne(req.params.id);
      if (result.affectedRows === 0) {
        return res.sendStatus(404);
      }
      return res.sendStatus(204);
    } catch (err) {
      console.error(err.message);
      return res.sendStatus(500);
    }
  };

  static checkEmailAndPassword = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) return res.sendStatus(400);

    try {
      const [[user]] = await models.user.findByEmail(email);

      if (!user) return res.sendStatus(401);

      const passwordIsValid = await models.user.isValidPassword(
        user.hashedPassword,
        password
      );

      if (!passwordIsValid) return res.sendStatus(401);

      delete user.hashedPassword;
      req.user = user;
      return next();
    } catch (err) {
      console.error(err);
      return res.sendStatus(500);
    }
  };

  static validateCreationData = async (req, res, next) => {
    const { error } = schemas.user.creation.validate(req.body);
    if (error) {
      return res.status(400).send(`${error.details[0].context.key} is wrong`);
    }
    return next();
  };

  static validateUpdateData = async (req, res, next) => {
    req.body.id = parseInt(req.params.id, 10);
    const { error } = schemas.user.update.validate(req.body);
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

  static emailAlreadyUsed = async (req, res, next) => {
    try {
      const [[user]] = await models.user.findByEmail(req.body.email);
      if (user) {
        return res.status(400).send("email is already used");
      }
      return next();
    } catch (err) {
      console.error(err.message);
      return res.sendStatus(500);
    }
  };
}

module.exports = UserController;
