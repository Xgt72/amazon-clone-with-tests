const express = require("express");

const { UserController, UserRoleController } = require("./controllers");
const JwtController = require("./helpers/JwtController");

const router = express.Router();

router.get("/users", UserController.browse);
router.get("/users/:id", UserController.read);
router.get("/users/:id/roles", UserController.readWithRoles);

router.put("/users/:id", UserController.edit);
// router.post("/users", UserController.add);
router.delete("/users/:id", UserController.delete);

router.post(
  "/register",
  UserController.readByEmail,
  UserController.add,
  UserRoleController.add,
  UserController.readWithRoles
);
router.post(
  "/login",
  UserController.checkEmailAndPassword,
  UserController.readWithRoles,
  JwtController.createAccessAndRefreshToken
);

router.get(
  "/refresh",
  JwtController.verifyRefreshToken,
  JwtController.createAccessAndRefreshToken
);

module.exports = router;
