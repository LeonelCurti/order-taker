const Order = require("../models/Orders");

exports.createOrder = async (req, res, next) => {

  //shoud create a unique order id 
  try {
    const order = await Order.create(req.body);
    return res.status(200).json({ success: true, order });
  } catch (error) {
    next(error);
  }
};
exports.getOrders = async (req, res, next) => {
  try {
    if (req.params.id) {
      const order = await Order.findById(req.params.id).populate("client");
      return res.status(200).json({ success: true, order: order });
    } else {
      const allOrders = await Order.find({}).populate("client");
      return res.status(200).json({ success: true, order: allOrders });
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
  try {
  
  } catch (error) {
    next(error);
  }
};


