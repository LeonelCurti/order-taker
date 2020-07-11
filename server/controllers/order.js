const Order = require("../models/Orders");
const Counter = require("../models/Counters");

exports.createOrder = async (req, res, next) => {
  try {
    //get the next order number available from counter
    const doc = await Counter.findOneAndUpdate(
      { _id: "UNIQUE COUNT ORDER IDENTIFIER" },
      { $inc: { count: 1 } },
      { new: true, upsert: true }
    );

    const orderCreated = await Order.create({
      user: req.user._id,
      number: doc.count,
    });
    return res.status(200).json({
      success: true,
      order: orderCreated,
      message: "Order created",
    });
  } catch (error) {
    next(error);
  }
};
exports.getOrders = async (req, res, next) => {
  const userId = req.user._id;
  try {
    const allOrders = await Order.find({ user: userId }).sort({
      updatedAt: -1,
    }); //most recent first

    return res.status(200).json({
      success: true,
      orders: allOrders,
      message: "Users orders found",
    });
  } catch (error) {
    next(error);
  }
};

exports.getOrderById = async (req, res, next) => {
  const orderId = req.params.order_id;
  try {
    const order = await Order.findById(orderId);

    return res.status(200).json({
      success: true,
      orders: order,
      message: "Order id found",
    });
  } catch (error) {
    next(error);
  }
};
exports.updateOrder = async (req, res, next) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.body.updatedOrder._id,
      req.body.updatedOrder,
      { new: true, runValidators: true }
    );
    if (!updatedOrder) {
      return res.status(400).json({
        success: false,
        error: "Order could not be updated",
      });
    }
    return res.status(200).json({
      success: true,
      order: updatedOrder,
      message: "Order updated",
    });
  } catch (error) {
    next(error);
  }
};
exports.deleteOrder = async (req, res, next) => {
  const orderId = req.params.order_id;
  try {
    const deletedOrder = await Order.findByIdAndDelete(orderId);
    if (!deletedOrder) {
      return res.status(400).json({
        success: false,
        error: "No such order id was found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Order deleted",
    });
  } catch (error) {
    next(error);
  }
};
