const { getTransactionsForAddress } = require("./src/fetchTransactions.js");
const { monitorWalletAddress } = require("./src/monitorWalletAddress.js");
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.send(JSON.stringify({ message: 'Connect to Solana Txn Data!' }));

    ws.on('message', async (data) => {
        console.log(`Received request: ${data}`);
        if(!data) {
            return;
        }
        const parsedData = JSON.parse(data);
        if(parsedData.method === 'fetch-transactions') {
            const transactions = await getTransactionsForAddress(parsedData.address);
            ws.send(JSON.stringify(transactions));
        } else if(parsedData.method === 'monitor-realtime-transactions') {
            monitorWalletAddress(parsedData.address, ws);
            ws.send(JSON.stringify({ message: `Monitoring ${parsedData.address} for transactions`}));
        } else {
            ws.send(JSON.stringify({ message: 'Invalid request'}));
        }
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

console.log('WebSocket server running on ws://localhost:8080');