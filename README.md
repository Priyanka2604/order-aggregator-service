# 🛒 Distributed Order Aggregator System

## OVERVIEW
A Node.js-based backend system that aggregates product stock from multiple vendor sources and processes orders reliably under high load using RabbitMQ and PostgreSQL.

## 📦 Features

- 🔗 Vendor integration via simulated APIs
- 🗃️ Local stock storage in PostgreSQL
- 🛒 REST API to place and confirm orders
- 📬 RabbitMQ-based queue system for background processing
- ♻️ Retry logic and Dead Letter Queue (DLQ) support
- ⚙️ Modular monolith architecture with clean separation

## ⚙️ TECH STACK

![Node.js](https://img.shields.io/badge/nodejs-18.x-green)
![Express](https://img.shields.io/badge/express.js-lightgrey)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14-blue)
![RabbitMQ](https://img.shields.io/badge/RabbitMQ-queue-orange)
![License](https://img.shields.io/badge/license-MIT-brightgreen)
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Messaging Queue**: RabbitMQ
- **Libraries**: Axios, dotenv, pg, amqplib
- **Testing**: Mocha, Chai

## 🧠 Architecture Diagram

System Design Doc : https://shorturl.at/e4MLc
Stock sync flow and Queue based worker model flow diagram : https://shorturl.at/RAXG3

## 🚀 Setup Instructions

### 1. Clone the Repository
```
git clone https://github.com/your-username/order-aggregator-service.git
cd order-aggregator-service
```

### 2. Install Dependencies
``` npm install ```

### 3. Environment Setup
Create a .env file in the root directory:
```
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_pg_username
DB_PASSWORD=your_pg_password
DB_NAME=order_aggregator
RABBITMQ_URL=amqp://localhost
```

### 4. Install and Start PostgreSQL and RabbitMQ (Mac)
```
brew install postgres
brew install rabbitmq
brew services start postgresql
brew services start postgresql@14
```

### 🛠️ Commands
#### ▶️ Start the Server
``` npm start ```
Runs the Express server on http://localhost:3000 

#### 🔄 Run Stock Sync Job
``` npm run sync:stock ```
Fetches vendor stock (from mock APIs) and updates the local products table.

#### 🛒 Place an Order
Use Postman or cURL to send a POST request:
```
POST http://localhost:3000/order
Content-Type: application/json

{
  "productId": "product-uuid-here",
  "quantity": 2
}
```
#### ⚙️ Start Order Worker
``` npm run worker ```

#### 🧪 Test
``` npm test```
Runs unit tests (Uses Mocha and Chai for unit tests).

📝 Assumptions
- Vendor APIs are mocked via Express routes.

- Orders are first saved with PENDING status and confirmed via worker.

- Stock is "locked" during DB transaction to avoid race conditions.

