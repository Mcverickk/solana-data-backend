const { PublicKey } = require("@solana/web3.js");
const {connection} = require("./connection.js");
const { fetchTransactions } = require("./fetchTransactions.js");

const monitorWalletAddress = (walletAddress, ws) => {
    connection.onLogs(
        new PublicKey(walletAddress),
        async (response) => {
            const {signature} = response;
            console.log(`Received new transaction: ${signature}`);
            const txn = await fetchTransactions([signature]);
            ws.send(JSON.stringify(txn));
        },
        "finalized"
    )
}

module.exports = {
    monitorWalletAddress
}