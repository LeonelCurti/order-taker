const express = require("express");
const router = express.Router();
const {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} = require("../controllers/orders");
const { isAuth } = require("../middleware/auth");

//@route   /api/v1/orders
router.get("/", isAuth, getOrders);
router.get("/:order_id", isAuth, getOrderById);
router.post("/createOrder", isAuth, createOrder);
router.put("/update", isAuth, updateOrder);
router.delete("/:order_id", isAuth, deleteOrder);

module.exports = router;
