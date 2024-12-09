const { PublicKey } = require('@solana/web3.js');
const { TOKEN_PROGRAM_ID } = require('@solana/spl-token');

const processTransactions = (transaction) => {
    const processedTransaction = {};

    if(!transaction){
        return processedTransaction;
    }

    const {blockTime, meta, slot, transaction: txnObj} = transaction;

    processedTransaction.timestamp = blockTime;
    processedTransaction.block = slot;

    const {err, status, computeUnitsConsumed, fee, logMessages } = meta;
    
    processedTransaction.computeUnitsConsumed = computeUnitsConsumed;
    processedTransaction.fee = fee;
    processedTransaction.logs = logMessages;
    
    if(!err && !status.Ok){
        processedTransaction.status = "Success";
    } else {
        processedTransaction.status = "Failed";
    }
    
    const { message, signatures } = txnObj;
    
    processedTransaction.signature = signatures[0];
    processedTransaction.recentBlockhash = message.recentBlockhash;
    processedTransaction.fromAddress = message.accountKeys[0].toString();

    const processedInstructions = processInstructions(message);

    processedTransaction.instructions = processedInstructions;

    return processedTransaction;
}

const processInstructions = (message) => {
    const processedInstructions = [];
    const { instructions, indexToProgramIds } = message;

    for(let i = 0; i < instructions.length; i++) {
        let processedInstruction = {};

        const { accounts, data, programIdIndex } = instructions[i];
        processedInstruction.data = data;

        const programId = indexToProgramIds.get(programIdIndex).toString();
        if(programId === PublicKey.default.toString()){
            processedInstruction.program = "SOL Transfer";
        } else if(programId === TOKEN_PROGRAM_ID.toString()){
            processedInstruction.program = "Token Transfer";
        } else if(programId === "ComputeBudget111111111111111111111111111111"){
            processedInstruction.program = "Compute Budget Program";
        } else {
            processedInstruction.program = "Custom Program";
        }

        processedInstructions.push(processedInstruction)
    }
    return processedInstructions;
}

module.exports = { processTransactions };
