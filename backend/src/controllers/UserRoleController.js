const models = require("../models");

class UserRoleController {
  static add = async (req, res, next) => {
    const { user } = req;

    try {
      let roleId = 1;

      if (req.query.role === "2") {
        roleId = 2;
      } else if (req.query.role === "3") {
        roleId = 3;
      }

      await models.userRole.insertOne(user.id, roleId);
      return next();
    } catch (err) {
      console.error(err);
      return res.status(500).send(err.message);
    }
  };
}

module.exports = UserRoleController;
