const router = require("express").Router();
const userRoutes = require("./user.routes");
const productRoutes = require("./product.routes");
const commandRoutes = require("./command.routes");

router.use("/users", userRoutes);
router.use("/products", productRoutes);
router.use("/commands", commandRoutes);

module.exports = router;
