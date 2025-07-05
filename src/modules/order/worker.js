const { consumeQueue } = require('../shared/rabbitmq');
const orderModel = require('./model');

async function processOrder(order) {
  console.log('👷 Processing order:', order.order_id);
  try {
    // Simulate processing
    await new Promise((res) => setTimeout(res, 1000));

    await orderModel.updateOrderStatus(order.order_id, 'success');
    console.log(`✅ Order ${order.order_id} processed`);
  } catch (err) {
    console.error(`❌ Order ${order.order_id} failed:`, err.message);
    await orderModel.updateOrderStatus(order.order_id, 'failed');
  }
}

function startOrderWorker() {
  consumeQueue('order_queue', processOrder);
}

module.exports = {
  startOrderWorker,
};