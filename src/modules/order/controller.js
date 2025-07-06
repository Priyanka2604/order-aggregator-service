const orderService = require('./service');

async function placeOrder(req, res) {
  const { productId, quantity } = req.body;
  if (!productId || !quantity) {
    return res.status(400).json({ error: 'Missing productId or quantity' });
  }

  try {
    const order = await orderService.placeOrder(productId, quantity);
    res.status(201).json({
      message: '✅ Order placed successfully',
      order,
  });
  } catch (err) {
    console.error(err);
    res.status(500).json({'Failed to place order': err.message});
  }
}

module.exports = {
  placeOrder,
};