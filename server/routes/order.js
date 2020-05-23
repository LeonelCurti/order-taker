const express = require("express");
const router = express.Router();
const {
  createOrder,
  getOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/order");
const { isAuth } = require("../middleware/auth");

router.get("/", getOrders);
router.get("/:id", getOrders);
router.post("/", createOrder);
router.put("/:id", updateOrder);//falta
router.delete("/:id", deleteOrder);//falta

module.exports = router;
