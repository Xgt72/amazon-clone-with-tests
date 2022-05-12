const models = require("../models");

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
      .find(req.params.id)
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
    // console.debug(req.body);
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

  static edit = (req, res) => {
    const user = req.body;

    // TODO validations (length, format...)

    user.id = parseInt(req.params.id, 10);

    models.user
      .update(user)
      .then(([result]) => {
        if (result.affectedRows === 0) {
          res.sendStatus(404);
        } else {
          res.sendStatus(204);
        }
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static add = async (req, res) => {
    const user = req.body;

    // TODO validations (length, format...)
    try {
      const hashedPassword = await models.user.hashPassword(user.password);

      delete user.password;
      user.hashedPassword = hashedPassword;

      const [result] = await models.user.insert(user);
      res.status(201).send({
        username: user.username,
        email: user.email,
        id: result.insertId,
      });
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  };

  static delete = (req, res) => {
    models.user
      .delete(req.params.id)
      .then(() => {
        res.sendStatus(204);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
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
}

module.exports = UserController;