const { PublicKey } = require('@solana/web3.js');
const { TOKEN_PROGRAM_ID } = require('@solana/spl-token');

const processTransactions = async (transaction) => {
    const processedTransaction = {};

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


    console.log(processedTransaction);
}


const processInstructions = (message) => {
    const processedInstructions = [];
    const { instructions, indexToProgramIds, accountKeys } = message;
    for(let i = 0; i < instructions.length; i++) {
        const { accounts, data, programIdIndex } = instructions[i];
        let processedInstruction = {};
        processedInstruction.data = data;
        
        const programId = indexToProgramIds.get(programIdIndex);
        if(programId.toString() === PublicKey.default.toString()){
            processedInstruction.program = "SOL Transfer";
            processedInstruction.fromAddress = accountKeys[accounts[0]].toString();
            processedInstruction.toAddress = accountKeys[accounts[1]].toString();
        } else if(programId.toString() === TOKEN_PROGRAM_ID.toString()){
            processedInstruction.program = "Token Transfer";
        } else if(programId.toString() === "ComputeBudget111111111111111111111111111111"){
            processedInstruction.program = "Compute Budget Program";

        } else {
            processedInstruction.program = "Custom Program";
        }

        processedInstructions.push(processedInstruction)
    }
    return processedInstructions;
}



module.exports = { processTransactions };



// const txnData = {
//     message: Message {
//       header: {
//         numReadonlySignedAccounts: 0,
//         numReadonlyUnsignedAccounts: 2,
//         numRequiredSignatures: 1
//       },
//       accountKeys: [
//         [PublicKey [PublicKey(HrpW6yzDnQdfsS3K8NpD4Vtz2XxkZUmieigQoa1GeGbV)]],
//         [PublicKey [PublicKey(FDxSr2iosAu5zVAmLRTbhTnnKwvBHPMycVbpb2S9V5P3)]],
//         [PublicKey [PublicKey(11111111111111111111111111111111)]],
//         [PublicKey [PublicKey(ComputeBudget111111111111111111111111111111)]]
//       ],
//       recentBlockhash: '7i35NxL93yx3KYN4fJEjHW5BtPsUS25daZC4ag19FAcL',
//       instructions: [ [Object], [Object], [Object] ],
//       indexToProgramIds: Map(2) {
//         3 => [PublicKey [PublicKey(ComputeBudget111111111111111111111111111111)]],
//         2 => [PublicKey [PublicKey(11111111111111111111111111111111)]]
//       }
//     },
//     signatures: [
//       '2ncPTU8MYiLnpvqC9yjMSJCTgwQyyu1jPN9S5neSS8grHYPT5cZp7p2xFEdFH4sVBec3NBzBBTKkDTPjUGRrVNBa'
//     ]
//   }