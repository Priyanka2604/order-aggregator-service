const amqp = require('amqplib');

let channel = null;

async function connectRabbitMQ() {
  const connection = await amqp.connect(process.env.RABBITMQ_URL);
  channel = await connection.createChannel();
  await channel.assertQueue('order_queue');
  console.log('✅ Connected to RabbitMQ');
}

function publishToQueue(queueName, msg) {
  if (!channel) throw new Error('RabbitMQ channel not established');
  channel.sendToQueue(queueName, Buffer.from(JSON.stringify(msg)));
}

function consumeQueue(queueName, onMessage) {
  if (!channel) throw new Error('RabbitMQ channel not established');
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