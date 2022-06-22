// access to process.env
require("dotenv").config();
const mysql = require("mysql2");

let config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

if (process.env.NODE_ENV === "test") {
  config = {
    host: process.env.DB_HOST_TEST,

    user: process.env.DB_USER_TEST,
    password: process.env.DB_PASSWORD_TEST,
    database: process.env.DB_NAME_TEST,
    multipleStatements: true,
  };
}

const pool = mysql.createPool(config);

const closeConnection = () => {
  return new Promise((resolve, reject) => {
    if (pool) {
      // console.debug("close connection");
      pool.end((err) => {
        if (err) {
          // console.debug("error to close connection");
          reject(err);
        } else {
          // console.debug("no error to close connection");
          resolve();
        }
      });
    } else {
      resolve();
    }
  });
};

module.exports = {
  connection: pool.promise(),
  closeConnection,
};
