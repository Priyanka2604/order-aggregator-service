const amqp = require('amqplib');

let channel = null;

async function connectRabbitMQ() {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    channel = await connection.createChannel();
    await channel.assertQueue("order_queue");
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
  const channel = getChannel();
  channel.sendToQueue(queueName, Buffer.from(JSON.stringify(msg)));
}

function consumeQueue(queueName, onMessage) {
    const channel = getChannel();
    channel.consume(queueName, async (msg) => {
      const data = JSON.parse(msg.content.toString());
      await onMessage(data);
      channel.ack(msg);
    });
}

module.exports = {
  connectRabbitMQ,
  publishToQueue,
  consumeQueue,
};