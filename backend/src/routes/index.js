const router = require("express").Router();
const commandRoutes = require("./command.routes");
const paymentRoutes = require("./payment.routes");
const productRoutes = require("./product.routes");
const userRoutes = require("./user.routes");

router.use("/commands", commandRoutes);
router.use("/payments", paymentRoutes);
router.use("/products", productRoutes);
router.use("/users", userRoutes);

module.exports = router;
