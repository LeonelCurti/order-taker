const express = require("express");
const router = express.Router();
const {
  createOrder,
  getUserOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} = require("../controllers/order");
const { isAuth } = require("../middleware/auth");


//@route   /api/v1/order
router.get("/", isAuth, getUserOrders);
router.get("/:order_id", isAuth, getOrderById);
router.post("/", isAuth, createOrder);
router.put("/:order_id", updateOrder); //falta
router.delete("/:order_id", deleteOrder); 

module.exports = router;
