# Solana Data Backend

This project is a backend service that reads from the Solana blockchain, focusing on comprehensive transaction analysis and data retrieval.

## Design Question

**1.** What are some issues that could occur with watching transactions in real-time that then need to be processed downstream? What are some strategies you would use to deal with these issues?

In the current approach we receive the log event only once for a transaction. And, we receive incomplete data during the different stages of the transaction. We need a retry mechanism to fetch the transaction data as it is updated on the blockchain. This will also be important if we want to show the transaction in real-time going through the processing stages. To tackle this, we can implement a queue with the signature(message) to keep fetching the transaction state and publishing it with the new info. Once the transaction is finalized we can publish the final processed transaction and delete it from the queue.

**2.** What is your suggested tech stack / architecture for this service?

- As a lot of solana SDK are in Typescript, Typescript would be a good choice for programming lagangue.
- WebSocket for real-time updates and REST APIs for fetching historical transaction data.
- Connection to a healty RPC provider
- A processing module to process the incoming transactions downstream by parsing logs, instructions, etc.
- A caching mechanism to cache the transaction data for faster retrieval without making repeatative API calls
- A retry mechanism using queue to fetch transaction with incomplete data and publish real time updates

## Getting Started

### Installation & Running the Program

1. Clone the repository:
    ```sh
    git clone https://github.com/Mcverickk/solana-data-backend.git
    ```
2. Install dependencies:
    ```sh
    cd solana-data-backend
    npm install
    ```
3. Add `RPC_URL` in .env
4. Start the development server:
    ```sh
    npm start
    ```
5. Connect with the websocket server runnig on `ws://localhost:8080`.

### Websocket Request Message Payload

1. Fetching Past Transactions
    ```sh
    {
        "method" : "fetch-transactions",
        "address" : "HrpW6yzDnQdfsS3K8NpD4Vtz2XxkZUmieigQoa1GeGbV"
    }
    ```
2. Subscribing an address for real-time transaction monitoring
    ```sh
    {
        "method" : "monitor-realtime-transactions",
        "address" : "HrpW6yzDnQdfsS3K8NpD4Vtz2XxkZUmieigQoa1GeGbV"
    }
    ```

### Transaction Object Structure
    {
        timestamp,
        block,
        computeUnitsConsumed,
        fee,
        logs,
        status,
        signature,
        recentBlockhash,
        fromAddress,
        instructions : {
            program,
            data
        }
    }

