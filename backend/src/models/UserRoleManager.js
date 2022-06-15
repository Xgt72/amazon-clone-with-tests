/* eslint-disable class-methods-use-this */
const AbstractManager = require("./AbstractManager");

class UserRoleManager extends AbstractManager {
  static table = "user_role";

  insert(userId, roleId) {
    return this.connection.query(
      `insert into ${UserRoleManager.table} (userId, roleId) values (?, ?)`,
      [userId, roleId]
    );
  }

  findAll() {
    return this.connection.query(`select * from  ${this.table}`);
  }
}

module.exports = UserRoleManager;
