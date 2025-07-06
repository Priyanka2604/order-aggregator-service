const db = require('../shared/db');

async function createOrder({ productId, quantity }) {
  const result = await db.query(
    `INSERT INTO orders (id, product_id, quantity, status) 
     VALUES (gen_random_uuid(), $1, $2, 'pending') 
     RETURNING *`,
    [productId, quantity]
  );
  return result.rows[0];
}

async function updateOrderStatus(orderId, status) {
  const res = await db.query(
    `UPDATE orders
     SET status = $1
     WHERE id = $2`,
    [status, orderId]
  );

  if (res.rowCount === 0) {
    throw new Error(`Order ${orderId} is not in PENDING state or does not exist.`);
  }

  return res.rows[0];
}

module.exports = {
  createOrder,
  updateOrderStatus,
};