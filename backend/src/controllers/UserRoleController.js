const models = require("../models");

class UserRoleController {
  static add = async (req, res, next) => {
    const { user } = req;

    try {
      let roleId = 1;

      if (req.query.role === "EDITOR") {
        roleId = 2;
      } else if (req.query.role === "ADMIN") {
        roleId = 3;
      }

      await models.user_role.insert(user.id, roleId);
      return next();
    } catch (err) {
      console.error(err);
      return res.status(500).send(err.message);
    }
  };

  // static delete = (req, res) => {
  //   models.user_role
  //     .delete(req.params.id)
  //     .then(() => {
  //       res.sendStatus(204);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //       res.sendStatus(500);
  //     });
  // };
}

module.exports = UserRoleController;
