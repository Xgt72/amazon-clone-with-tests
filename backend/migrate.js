require("dotenv").config();

const fs = require("fs");
const mysql = require("mysql2/promise");

const migrate = async () => {
  const {
    DB_HOST,
    DB_PORT,
    DB_USER,
    DB_PASSWORD,
    DB_NAME,
    DB_HOST_TEST,
    DB_PORT_TEST,
    DB_USER_TEST,
    DB_PASSWORD_TEST,
    DB_NAME_TEST,
  } = process.env;

  let config = {
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
    multipleStatements: true,
  };

  let dbName = DB_NAME;

  if (process.env.NODE_ENV === "test") {
    config = {
      host: DB_HOST_TEST,
      port: DB_PORT_TEST,
      user: DB_USER_TEST,
      password: DB_PASSWORD_TEST,
      multipleStatements: true,
    };
    dbName = DB_NAME_TEST;
  }

  // console.debug(config, dbName);

  const connection = await mysql.createConnection(config);

  await connection.query(`drop database if exists ${dbName}`);
  await connection.query(`create database ${dbName}`);
  await connection.query(`use ${dbName}`);

  const sql = fs.readFileSync("./database.sql", "utf8");

  await connection.query(sql);

  connection.end();
};

try {
  migrate();
} catch (err) {
  console.error(err);
}
