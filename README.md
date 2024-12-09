# Solana Data Backend

This project is a backend service for managing Solana blockchain data.

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
3. Start the development server:
    ```sh
    npm start
    ```
4. Connect with the websocket server runnig on `ws://localhost:8080`.

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

    