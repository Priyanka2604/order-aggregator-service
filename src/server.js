require('dotenv').config();
const app = require('./app');
const { connectRabbitMQ } = require('./modules/shared/rabbitmq');
const { startOrderWorker } = require('./modules/order/worker');

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await connectRabbitMQ(); // 🟢 Connect to RabbitMQ first
    startOrderWorker(); // 🟢 Then start worker
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ App failed to start:', err.message);
  }
})();