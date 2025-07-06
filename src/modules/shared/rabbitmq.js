const amqp = require('amqplib');

let channel = null;

async function connectRabbitMQ() {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    channel = await connection.createChannel();
    await channel.assertQueue("order_queue");
    await channel.assertQueue('order_dlq'); // declare Dead Letter Queue
    console.log("✅ Connected to RabbitMQ");
  } catch (error) {
    console.error("❌ RabbitMQ connection failed:", error.message);
    throw error;
  }
}

function getChannel() {
  if (!channel) throw new Error('RabbitMQ channel not established');
  return channel;
}

function publishToQueue(queueName, msg) {
  const ch = getChannel();
  ch.sendToQueue(queueName, Buffer.from(JSON.stringify(msg)));
}

const MAX_RETRIES = 3;

function consumeQueue(onMessage) {
  const ch = getChannel();
  ch.consume('order_queue', async (msg) => {
    try {
      await onMessage(msg);
      ch.ack(msg);
    } catch (err) {
      const headers = msg.properties.headers || {};
      const attempts = headers['x-retry'] || 0;

      console.error('❌ Error handling message:', err.message);

      if (attempts < MAX_RETRIES) {
        ch.sendToQueue('order_queue', msg.content, {
          headers: { 'x-retry': attempts + 1 }
        });
      } else {
        console.warn('🔁 Max retries reached. Sending to DLQ.');
        ch.sendToQueue('order_dlq', msg.content); // send to Dead Letter Queue
      }

      ch.ack(msg); // mark current message as processed (even if requeued)
      ch.nack(msg, false, true); // discard or DLQ
    }
  });
}

module.exports = {
  connectRabbitMQ,
  publishToQueue,
  consumeQueue,
};