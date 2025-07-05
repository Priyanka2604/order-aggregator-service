const db = require('../shared/db');
const { publishToQueue } = require('../shared/rabbitmq');
const orderModel = require('./model');

async function placeOrder(productId, quantity) {
  const client = await db.pool.connect();

  try {
    await client.query('BEGIN');

    // Lock the product row
    const res = await client.query(
      `SELECT * FROM products WHERE product_id = $1 FOR UPDATE`,
      [productId]
    );

    if (res.rows.length === 0) throw new Error('Product not found');

    const product = res.rows[0];
    if (product.stock < quantity) throw new Error('Insufficient stock');

    // Update local stock
    await client.query(
      `UPDATE products SET stock = stock - $1 WHERE product_id = $2`,
      [quantity, productId]
    );

    // Create order
    const order = await client.query(
      `INSERT INTO orders (order_id, product_id, quantity, status) 
       VALUES (gen_random_uuid(), $1, $2, 'pending') RETURNING *`,
      [productId, quantity]
    );

    await client.query('COMMIT');

    // Send to RabbitMQ
    publishToQueue('order_queue', order.rows[0]);

    return order.rows[0];
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}

module.exports = {
  placeOrder,
};