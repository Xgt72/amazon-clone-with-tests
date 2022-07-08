const router = require("express").Router();

const { ProductController, AuthController } = require("../controllers");

router.get("/", ProductController.browse);
router.get("/:id", AuthController.verifyAccessToken, ProductController.read);
router.post(
  "/",
  AuthController.verifyAccessToken,
  ProductController.validateCreationData,
  ProductController.add,
  ProductController.read
);
router.put(
  "/:id",
  AuthController.verifyAccessToken,
  ProductController.read,
  ProductController.validateUpdateData,
  ProductController.edit
);
router.delete(
  "/:id",
  AuthController.verifyAccessToken,
  ProductController.deleteOne
);

module.exports = router;
