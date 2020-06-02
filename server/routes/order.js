const express = require("express");
const router = express.Router();
const {
  createOrder,
  getOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/order");
const { isAuth } = require("../middleware/auth");

router.get("/", isAuth, getOrders);
router.get("/:order_id", isAuth, getOrders);
router.post("/", isAuth, createOrder);
router.put("/:order_id", updateOrder); //falta
router.delete("/:order_id", deleteOrder); 

module.exports = router;
