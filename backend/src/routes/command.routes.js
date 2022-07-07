const router = require("express").Router();

const { CommandController, AuthController } = require("../controllers");

router.get("/", CommandController.browse);
router.get("/:id", AuthController.verifyAccessToken, CommandController.read);
router.post(
  "/",
  AuthController.verifyAccessToken,
  CommandController.validateCreationData,
  CommandController.add,
  CommandController.read
);
router.put(
  "/:id",
  AuthController.verifyAccessToken,
  CommandController.read,
  CommandController.validateUpdateData,
  CommandController.edit
);
router.delete(
  "/:id",
  AuthController.verifyAccessToken,
  CommandController.deleteOne
);

module.exports = router;
