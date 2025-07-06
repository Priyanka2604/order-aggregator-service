const cron = require('node-cron');
const { syncAllVendorStock } = require('./stock.sync');

// Runs every minute (adjust as needed)
cron.schedule('* * * * *', async () => {
  console.log('🕒 Running stock sync job');
  await syncAllVendorStock();
});
