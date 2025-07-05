const express = require('express');
const router = express.Router();
const vendorController = require('./controller');

router.get('/:vendorId/stock', vendorController.getStock); // Get stock from a vendor
router.post('/:vendorId/stock', vendorController.updateStock);  // Set stock for testing
router.get('/', vendorController.listVendors); // List all available vendors

module.exports = router;