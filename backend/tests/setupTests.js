const { closeConnection } = require("../src/db-connection");
const server = require("..");

const closeApp = () =>
  new Promise((resolve, reject) => {
    server.close((err) => {
      if (err) reject(err);
      else resolve();
    });
  });

afterAll(async () => {
  await closeConnection();
  await closeApp();
});
