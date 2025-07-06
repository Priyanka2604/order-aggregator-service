const db = require('../shared/db');

async function getProductStock(productId) {
  const result = await db.query(
    'SELECT * FROM products WHERE product_id = $1',
    [productId]
  );
  return result.rows[0];
}

async function upsertProductStock({ productId, vendorId, stock }) {
  await db.query(
    `INSERT INTO products (product_id, vendor_id, stock)
     VALUES ($1, $2, $3)
     ON CONFLICT (product_id)
     DO UPDATE SET stock = $3, updated_at = NOW()`,
    [productId, vendorId, stock]
  );
}

async function getAllStock() {
  const result = await db.query('SELECT * FROM products');
  return result.rows;
}

module.exports = {
  getProductStock,
  upsertProductStock,
  getAllStock,
};
