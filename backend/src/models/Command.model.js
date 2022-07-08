const { connection } = require("../db-connection");

const table = "command";

function findOneById(id) {
  return connection.query(`select * from  ${table} where id = ?`, [id]);
}

function findAll() {
  return connection.query(`select * from  ${table}`);
}

function findAllByUserId(userId, orderBy, flow) {
  let sql = `SELECT * FROM ${table} WHERE userId = ?`;
  const sqlValues = [userId];
  if (orderBy === "created") {
    sql += " ORDER BY created";
    if (flow === "DESC") {
      sql += " DESC";
    }
  }

  return connection.query(sql, sqlValues);
}

function findAllWithBasketsByUserId(userId) {
  const sql = `SELECT c.id, c.paymentIntentId, c.amount, c.created, b.productId, b.quantity, p.title, p.price, p.image, p.rating FROM ${table} c JOIN basket b ON b.commandId=c.id JOIN product p ON p.id=b.productId WHERE userId=? ORDER BY c.created DESC`;
  const sqlValues = [userId];
  return connection.query(sql, sqlValues);
}

function insertOne(command) {
  return connection.query(`insert into ${table} set ?`, [command]);
}

function updateOne(id, commandData) {
  let sql = `UPDATE ${table} SET `;
  const values = Object.values(commandData);
  const properties = Object.keys(commandData);
  sql += properties.join("=?, ");
  sql += "=? WHERE id=?";
  return connection.query(sql, [...values, id]);
}

function deleteOne(id) {
  return connection.query(`delete from ${table} where id = ?`, [id]);
}

module.exports = {
  findOneById,
  findAll,
  findAllByUserId,
  findAllWithBasketsByUserId,
  insertOne,
  updateOne,
  deleteOne,
};
