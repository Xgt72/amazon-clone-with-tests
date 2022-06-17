/* eslint-disable class-methods-use-this */
const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  static table = "user";

  insert(user) {
    return this.connection.query(
      `insert into ${UserManager.table} (username, email, hashedPassword) values (?, ?, ?)`,
      [user.username, user.email, user.hashedPassword]
    );
  }

  update(user) {
    return this.connection.query(
      `update ${UserManager.table} set ? where id = ?`,
      [user]
    );
  }

  findAll() {
    return this.connection.query(
      `select id, username, email from  ${this.table}`
    );
  }
}

module.exports = UserManager;
