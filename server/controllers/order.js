const Order = require("../models/Orders");
const User = require("../models/Users");

exports.createOrder = async (req, res, next) => {
  const newOrder = {
    user: req.user._id,
    number: 1, //shoud be a unique order id
    total: 0,
  };

  try {
    const order = await Order.create(newOrder);
    return res.status(200).json({ success: true, order });
  } catch (error) {
    next(error);
  }
};
exports.getOrders = async (req, res, next) => {
  const orderId = req.params.id;
  const userId = req.user._id;
  try {
    if (orderId) {
      //send particular user order
      const order = await Order.findById(orderId);
      return res.status(200).json({ success: true, orders: order });
    } else {
      //send all user orders
      const allOrders = await Order.find({ user: userId }).sort({ date: -1 }); //most recent first
      return res.status(200).json({ success: true, orders: allOrders });
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
  const orderId = req.params.id;
  try {
    const deletedOrder =await Order.findByIdAndDelete(orderId);    
    if (!deletedOrder) {
      return res.status(400).json({ success: false, error:'No such order id was found'});
    }
    return res.status(200).json({ success: true});
  } catch (error) {
    next(error);
  }
};
