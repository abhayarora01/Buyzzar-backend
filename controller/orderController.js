const Order = require("../models/order.models");

const getMyOrders = async (req, res) => {
  try {
    const userId = req.user._id; // ye req.user tu auth middleware se bhej raha hoga
    const orders = await Order.find({ userId }).populate("items.productId");

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getMyOrders };
