const express = require("express");
const router = express.Router();
const {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} = require("../controllers/orders");
const { auth } = require("../middleware/auth");

//@route   /api/v1/orders
router.get("/", auth(), getOrders);
router.get("/:order_id", auth(), getOrderById);
router.post("/createOrder", auth(), createOrder);
router.put("/update", auth(), updateOrder);
router.delete("/:order_id", auth(), deleteOrder);

module.exports = router;
