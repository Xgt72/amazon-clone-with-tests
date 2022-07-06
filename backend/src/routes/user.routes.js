const router = require("express").Router();

const {
  UserController,
  UserRoleController,
  AuthController,
} = require("../controllers");

router.get("/", AuthController.verifyAccessToken, UserController.browse);
router.get("/logout", AuthController.verifyAccessToken, AuthController.logout);
router.get(
  "/refresh",
  AuthController.verifyRefreshToken,
  AuthController.createAccessToken
);
router.get("/:id", UserController.read);
router.get("/:id/roles", UserController.readWithRoles);
router.post(
  "/login",
  UserController.checkEmailAndPassword,
  UserController.readWithRoles,
  AuthController.createAccessAndRefreshToken
);
router.post(
  "/register",
  UserController.validateCreationData,
  UserController.emailAlreadyUsed,
  UserController.add,
  UserRoleController.add,
  UserController.readWithRoles
);
router.put("/:id", UserController.validateUpdateData, UserController.edit);
router.delete("/:id", UserController.deleteOne);

module.exports = router;
