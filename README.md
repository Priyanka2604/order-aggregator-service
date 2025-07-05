# Backend Assignment: Distributed Order Aggregator System

## OBJECTIVE
Build a Node.js-based order processing platform that acts as a stock aggregator, syncing inventories from multiple third-party vendor systems and ensuring consistent and reliable order handling under high load.

## OVERVIEW
Your system integrates with independent vendor systems and maintains a local copy of their stock in your PostgreSQL database. This enables faster access and better availability for real-time order processing.

You will simulate third-party systems as mock APIs or separate databases.

## REQUIREMENTS
### 1. Vendor Integration (Stock Aggregation)
Vendors can be mocked as:
Randomized API endpoints (/vendorA/stock, etc.)
Or separate local Postgres tables/databases
Store aggregated stock in your local DB.

### 2. Order API
POST /order
Accepts product ID and quantity.
Must:
Check local stock
Reserve and reduce stock atomically bot for local and vendor
Prevent double-selling under concurrency

### 3. Messaging Queue Integration
Use RabbitMQ (preferred) or Zookeeper to:
Queue order events for processing
Ensure only one worker processes each order
Guarantee no duplicate processing
Include basic retry logic for failures

### 4. Consistency & Availability
Design for:
Consistency between vendor stock and local stock
Strong consistency in local order processing
High availability and safe parallelism under high load.

## TECHNICAL STACK
Language: Node.js
DB: PostgreSQL
Messaging: RabbitMQ or Zookeeper
Architecture: Microservice-style or modular monolith.

## DELIVERABLES
Code repo with working solution
Simple system design doc (1 page max):
Stock sync flow
Order placement architecture
Queue-based worker model
Consistency guarantees
README:
Setup instructions
Any assumptions or mock data
Commands to run stock sync, place order, run workers.

### BONUS (OPTIONAL)
Simulate vendor failures and show system recovery.
