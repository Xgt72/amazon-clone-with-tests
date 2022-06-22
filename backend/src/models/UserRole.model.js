const { connection } = require("../db-connection");

const table = "user_role";

function findOneById(id) {
  return connection.query(`select * from  ${table} where id = ?`, [id]);
}

function findAll() {
  return connection.query(`select * from  ${table}`);
}

function insertOne(userId, roleId) {
  return connection.query(
    `insert into ${table} (userId, roleId) values (?, ?)`,
    [userId, roleId]
  );
}

function deleteOne(id) {
  return connection.query(`delete from ${table} where id = ?`, [id]);
}

module.exports = {
  findOneById,
  findAll,
  insertOne,
  deleteOne,
};
