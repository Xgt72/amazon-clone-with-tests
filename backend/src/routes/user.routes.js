const router = require("express").Router();

const { UserController, UserRoleController } = require("../controllers");

router.get("/", UserController.browse);
router.get("/:id", UserController.read);
router.get("/:id/roles", UserController.readWithRoles);
router.post(
  "/register",
  UserController.add,
  UserRoleController.add,
  UserController.readWithRoles
);
router.put("/:id", UserController.edit);
router.delete("/:id", UserController.deleteOne);

module.exports = router;
