/* eslint-disable class-methods-use-this */
const argon2 = require("argon2");
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

  findByEmail(email) {
    return this.connection.query(`select * from  ${this.table} where email=?`, [
      email,
    ]);
  }

  hashPassword(password) {
    return argon2.hash(password);
  }

  isValidPassword(hashedPassword, password) {
    return argon2.verify(hashedPassword, password);
  }

  // findAllWithRoles() {
  //   return this.connection.query(
  //     `SELECT u.id, u.username, u. email, r.id roleId, r.title, r.code FROM ${this.table} JOIN user_role ur ON u.id=ur.userId JOIN role r ON r.id=ur.roleId ORDER BY u.id`
  //   );
  // }

  findOneWithRoles(id) {
    return this.connection.query(
      `SELECT u.id, u.username, u.email, r.id roleId, r.title, r.code FROM ${this.table} u JOIN user_role ur ON u.id=ur.userId JOIN role r ON r.id=ur.roleId WHERE u.id=?`,
      [id]
    );
  }
}

module.exports = UserManager;
