const vendorService = require('./service');

async function getStock(req, res) {
  const { vendorId } = req.params;
  try {
    const stock = vendorService.getVendorStock(vendorId);
    res.json(stock);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

async function updateStock(req, res) {
  const { vendorId } = req.params;
  const { productId, stock } = req.body;

  if (!productId || stock == null) {
    return res.status(400).json({ error: 'productId and stock are required' });
  }

  try {
    const updated = vendorService.updateVendorStock(vendorId, productId, stock);
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function listVendors(req, res) {
  const vendors = vendorService.listVendors();
  res.json(vendors);
}

module.exports = {
  getStock,
  updateStock,
  listVendors,
};
