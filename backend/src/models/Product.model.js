const { connection } = require("../db-connection");

const table = "product";

function findOneById(id) {
  return connection.query(`select * from  ${table} where id = ?`, [id]);
}

function findAll() {
  return connection.query(`select * from  ${table}`);
}

function insertOne(product) {
  return connection.query(`insert into ${table} set ?`, [product]);
}

function updateOne(id, productData) {
  let sql = `UPDATE ${table} SET `;
  const values = Object.values(productData);
  const properties = Object.keys(productData);
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
  insertOne,
  updateOne,
  deleteOne,
};
