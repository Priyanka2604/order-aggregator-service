const vendorStock = require('./mock');

function getVendorStock(vendorId) {
  const stock = vendorStock[vendorId];
  if (!stock) throw new Error('Vendor not found');
  return Object.entries(stock).map(([productId, quantity]) => ({
    productId,
    stock: quantity
  }));
}

function updateVendorStock(vendorId, productId, newStock) {
  if (!vendorStock[vendorId]) vendorStock[vendorId] = {};
  vendorStock[vendorId][productId] = newStock;
  return { productId, stock: newStock };
}

function listVendors() {
  return Object.keys(vendorStock);
}

module.exports = {
  getVendorStock,
  updateVendorStock,
  listVendors,
};