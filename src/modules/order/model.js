const db = require('../shared/db');

async function createOrder({ productId, quantity }) {
  const result = await db.query(
    `INSERT INTO orders (order_id, product_id, quantity, status) 
     VALUES (gen_random_uuid(), $1, $2, 'pending') 
     RETURNING *`,
    [productId, quantity]
  );
  return result.rows[0];
}

async function updateOrderStatus(orderId, status) {
  await db.query(
    `UPDATE orders SET status = $1 WHERE order_id = $2`,
    [status, orderId]
  );
}

module.exports = {
  createOrder,
  updateOrderStatus,
};