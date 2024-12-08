const { getTransactionsForAddress } = require("./src/transactions.js");


const WALLET_ADDRESS_1 = "HrpW6yzDnQdfsS3K8NpD4Vtz2XxkZUmieigQoa1GeGbV";
const WALLET_ADDRESS_2 = "FDxSr2iosAu5zVAmLRTbhTnnKwvBHPMycVbpb2S9V5P3";

const main = async () => {
    const transactions = await getTransactionsForAddress(WALLET_ADDRESS_1);
}

main();