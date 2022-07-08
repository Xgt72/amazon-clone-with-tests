const router = require("express").Router();

const {
  AuthController,
  BasketController,
  CommandController,
  UserController,
  UserRoleController,
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
router.put(
  "/:id",
  AuthController.verifyAccessToken,
  UserController.validateUpdateData,
  UserController.edit
);
router.delete(
  "/:id",
  AuthController.verifyAccessToken,
  UserController.deleteOne
);
router.get("/:id/commands", CommandController.getAllByUserId);
router.post("/:id/commands", CommandController.add, CommandController.read);

router.get(
  "/:id/commands/baskets",
  BasketController.getAllCommandsAndBasketsByUserId
);
router.post(
  "/:id/commands/:commandId/baskets",
  BasketController.createMultiple,
  BasketController.getAllByCommandId
);

module.exports = router;
