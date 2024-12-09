const { Connection } = require("@solana/web3.js");
const { RPC_URL } = require("../config");

const  connection = new Connection(RPC_URL);

module.exports = { connection };