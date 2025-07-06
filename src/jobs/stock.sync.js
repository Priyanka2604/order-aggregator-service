const axios = require('axios');
const stockService = require('../modules/stock/service');
const vendorList = require('../modules/vendors/mock');

const baseURL = 'http://localhost:3000'; // Assuming vendor APIs are local

async function syncAllVendorStock() {
  for (const vendorId of Object.keys(vendorList)) {
    try {
      console.log(`🔄 Syncing stock from vendor: ${vendorId}`);
      const res = await axios.get(`${baseURL}/vendor/${vendorId}/stock`, { timeout: 3000}); 
      const stockData = res.data;

      await stockService.syncStockFromVendor(vendorId, stockData);
      console.log(`✅ Synced ${stockData.length} products from ${vendorId}`);
    } catch (err) {
      console.error(`❌ Failed to sync vendor ${vendorId}:`);
      if (err.response) {
        // Server responded with a status outside 2xx
        console.error("Status:", err.response.status);
        console.error("Data:", err.response.data);
      } else if (err.request) {
        // Request made but no response
        console.error("No response received:", err.request);
      } else {
        // Something else happened
        console.error("Error Message:", err.message);
      }
    }
  }
}

if(require.main === module) {
  // If this file is run directly, start the sync process
  syncAllVendorStock()
}

module.exports = {
  syncAllVendorStock,
};