require('dotenv').config();
const app = require('./app');
const { connectRabbitMQ } = require('./modules/shared/rabbitmq');
const { startOrderWorker } = require('./modules/order/worker');

const PORT = process.env.PORT || 3000;

(async () => {
  await connectRabbitMQ();
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
})();

startOrderWorker();