const { PublicKey } = require("@solana/web3.js");
const { processTransactions } = require("./transactionProcessor.js");
const { connection } = require("./connection.js");


const getTransactionsForAddress = async (address) => {
    const signatureHistory = await fetchSignatureHistory(address);
    const transactions = await fetchTransactions(signatureHistory);
    let processedTransactions = [];
    for(let i = 0; i < transactions.length; i++) {
        const transaction = transactions[i];
        const processedTransaction = await processTransactions(transaction);
        processedTransactions.push(processedTransaction);
    }
    return processedTransactions;
}

const fetchSignatureHistory = async (address) => {
    const publicKey = new PublicKey(address);
    const signatureHistory = await connection.getSignaturesForAddress(publicKey);
    return signatureHistory.map((signature) => signature.signature);
}

const fetchTransactions = async (signatureHistory) => {
    const transactions = await connection.getTransactions(signatureHistory);
    return transactions;
}



module.exports = {
    getTransactionsForAddress
}