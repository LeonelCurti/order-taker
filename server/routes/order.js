const express = require("express");
const router = express.Router();
const {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} = require("../controllers/order");
const { isAuth } = require("../middleware/auth");


//@route   /api/v1/order
router.get("/", isAuth, getOrders);
router.get("/:order_id", isAuth, getOrderById);
router.post("/createOrder", isAuth, createOrder);
router.put("/update", updateOrder); 
router.delete("/:order_id", deleteOrder); 

module.exports = router;
