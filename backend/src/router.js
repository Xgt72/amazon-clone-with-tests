const express = require("express");

const { UserController } = require("./controllers");
const JwtController = require("./helpers/JwtController");

const router = express.Router();

router.get("/users", UserController.browse);
router.get("/users/:id", UserController.read);
router.put("/users/:id", UserController.edit);
// router.post("/users", UserController.add);
router.delete("/users/:id", UserController.delete);

router.post("/register", UserController.readByEmail, UserController.add);
router.post(
  "/login",
  UserController.checkEmailAndPassword,
  JwtController.createAccessToken
);

module.exports = router;
