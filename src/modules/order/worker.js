const { connectRabbitMQ, consumeQueue } = require('../shared/rabbitmq');
const orderModel = require('./model');

async function processOrderMessage(msg) {
  if (!msg || !msg.content) {
    console.error('❌ Received invalid message:', msg);
    return;
  }

  let order;

  try {
    order = JSON.parse(msg.content.toString());
  } catch (err) {
    console.error('❌ Failed to parse message:', err.message);
    return;
  }

  try {
    console.log(`📦 Processing order ${order.id}`);
    // Simulate processing delay
    await new Promise((r) => setTimeout(r, 500));

    await orderModel.updateOrderStatus(order.id, 'CONFIRMED');

    console.log(`✅ Order ${order.id} confirmed`);
  } catch (err) {
    console.error(`❌ Failed to process order ${order.id}:`, err.message);
    channel.nack(msg, false, true); // move to DLQ or log
  }
}

async function startOrderWorker() {
  await connectRabbitMQ();
  await consumeQueue(processOrderMessage);
}

startOrderWorker();

module.exports = {
  startOrderWorker
};