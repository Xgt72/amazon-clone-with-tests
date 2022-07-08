const { connection } = require("../db-connection");

const table = "basket";

function findAllByCommandId(orderId) {
  return connection.query(
    `SELECT b.productId, b.quantity, p.title, p.price, p.image, p.rating FROM ${table} b JOIN product p ON b.productId = p.id WHERE b.commandId=?`,
    [orderId]
  );
}

function insertOne(basket) {
  return connection.query(`INSERT INTO ${table} SET ?`, [basket]);
}

function insertMultiple(baskets) {
  const sql = `INSERT INTO ${table} (commandId, productId, quantity) VALUES ?`;
  const values = [];
  baskets.forEach((basket) => {
    values.push(Object.values(basket));
  });
  return connection.query(sql, [values]);
}

function updateOne(id, basketData) {
  let sql = `UPDATE ${table} SET `;
  const values = Object.values(basketData);
  const properties = Object.keys(basketData);
  sql += properties.join("=?, ");
  sql += "=? WHERE id=?";
  return connection.query(sql, [...values, id]);
}

module.exports = {
  findAllByCommandId,
  insertOne,
  insertMultiple,
  updateOne,
};
