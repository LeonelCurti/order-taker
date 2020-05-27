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
router.get("/:id", isAuth, getOrders);
router.post("/", isAuth, createOrder);
router.put("/:id", updateOrder); //falta
router.delete("/:id", deleteOrder); 

module.exports = router;
