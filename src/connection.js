const { Connection } = require("@solana/web3.js");
const { EXTRNODE_DEVNET_RPC_URL } = require("../config");

const  connection = new Connection(EXTRNODE_DEVNET_RPC_URL);

module.exports = { connection };