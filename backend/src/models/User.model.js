const argon2 = require("argon2");
const { connection } = require("../db-connection");

const table = "user";

function findOneById(id) {
  return connection.query(`select * from  ${table} where id = ?`, [id]);
}

function findAll() {
  return connection.query(`select id, username, email from  ${table}`);
}

function findByEmail(email) {
  return connection.query(`select * from  ${table} where email=?`, [email]);
}

function insertOne(user) {
  return connection.query(
    `insert into ${table} (username, email, hashedPassword) values (?, ?, ?)`,
    [user.username, user.email, user.hashedPassword]
  );
}

function updateOne(user) {
  return connection.query(`update ${table} set ? where id = ?`, [
    { hashedPassword: user.hashedPassword },
    user.id,
  ]);
}

function deleteOne(id) {
  return connection.query(`delete from ${table} where id = ?`, [id]);
}

function hashPassword(password) {
  return argon2.hash(password);
}

function isValidPassword(hashedPassword, password) {
  return argon2.verify(hashedPassword, password);
}

function findOneWithRoles(id) {
  return connection.query(
    `SELECT u.id, u.username, u.email, r.id roleId, r.title, r.code FROM ${table} u JOIN user_role ur ON u.id=ur.userId JOIN role r ON r.id=ur.roleId WHERE u.id=?`,
    [id]
  );
}

module.exports = {
  findAll,
  findOneById,
  findByEmail,
  findOneWithRoles,
  insertOne,
  updateOne,
  deleteOne,
  hashPassword,
  isValidPassword,
};
