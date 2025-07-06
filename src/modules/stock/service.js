const stockModel = require('./model');

async function syncStockFromVendor(vendorId, vendorStockList) {
  for (const item of vendorStockList) {
    const { productId, stock } = item;
    await stockModel.upsertProductStock({
      productId,
      vendorId,
      stock,
    });
  }
}

module.exports = {
  syncStockFromVendor,
  checkAndLockStock,
};