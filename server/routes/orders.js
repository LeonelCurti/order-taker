const express = require("express");
const orderRouter = express.Router();
const {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} = require("../controllers/orders");
const { auth } = require("../middleware/auth");

//@route   /api/v1/orders
orderRouter.get("/", auth(), getOrders);
orderRouter.get("/:order_id", auth(), getOrderById);
orderRouter.post("/createOrder", auth(), createOrder);
orderRouter.put("/update", auth(), updateOrder);
orderRouter.delete("/:order_id", auth(), deleteOrder);

module.exports = orderRouter;
