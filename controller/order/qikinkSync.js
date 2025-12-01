const { createQikinkOrder } = require('../../utils/qikink');

const qikinkSyncController = async (req, res) => {
  try {
    const order = req.body;

    const payload = {
      order_id: order._id,
      customer: {
        name: order.name,
        phone: order.phone,
        address: order.address,
      },
      products: order.products.map((item) => ({
        product_id: item.qikinkProductId,
        variant_id: item.variantId,
        quantity: item.quantity,
      })),
    };
    

    const result = await createQikinkOrder(payload);
    res.status(200).json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = qikinkSyncController;
