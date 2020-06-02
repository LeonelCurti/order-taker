const Order = require("../models/Orders");
const Counter = require("../models/Counters");

exports.createOrder = async (req, res, next) => {
  try {
    //get the next order number from counter
    const doc = await Counter.findOneAndUpdate(
      { _id: "UNIQUE COUNT ORDER IDENTIFIER" },
      { $inc: { count: 1 } },
      { new: true, upsert: true }
    );

    const orderCreated = await Order.create({
      user: req.user._id,
      number: doc.count,
    });
    return res.status(200).json({ success: true, orderCreated });
  } catch (error) {
    next(error);
  }
};
exports.getOrders = async (req, res, next) => {
  const orderId = req.params.order_id;
  const userId = req.user._id;
  try {
    if (orderId) {
      //send particular user order
      const order = await Order.findById(orderId);
      setTimeout(() => {
        return res.status(200).json({ success: true, orders: order });
      }, 500);
    } else {
      //send all user orders
      const allOrders = await Order.find({ user: userId }).sort({ updatedAt: -1 }); //most recent first
      setTimeout(() => {
        return res.status(200).json({ success: true, orders: allOrders });
      }, 500);
    }
  } catch (error) {
    next(error);
  }
};
exports.updateOrder = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
exports.deleteOrder = async (req, res, next) => {
  const orderId = req.params.order_id;
  try {
    const deletedOrder = await Order.findByIdAndDelete(orderId);
    if (!deletedOrder) {
      return res
        .status(400)
        .json({ success: false, error: "No such order id was found" });
    }
    return res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};
