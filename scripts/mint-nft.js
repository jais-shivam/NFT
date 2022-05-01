require("dotenv").config();
const API_URL = process.env.API_URL;

const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

const contract =require("../artifacts/contracts/NFT.sol/NFT.json"); //NFT ABI

// console.log(JSON.stringify(contract.abi));

// Contract deployed address
const contractAddress= "0x0Cb0bD3814ef26fb94ff7C07B2DDC70dFF7bffb5";

// creating instance of the contract
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);
// Create transaction
async function mintNFT(tokenURI){
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest"); //get latest nonce

    const tx={
        'from': PUBLIC_KEY,
        'to':contractAddress,
        'nonce':nonce,
        'gas':500000,
        'data':nftContract.methods.mintNFT(PUBLIC_KEY,tokenURI).encodeABI(),
    };

    // Signing transaction
    const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
    signPromise
        .then((signedTx) => {
        web3.eth.sendSignedTransaction(
            signedTx.rawTransaction,
            function (err, hash) {
            if (!err) {
                console.log(
                "The hash of your transaction is: ",
                hash,
                "\nCheck Alchemy's Mempool to view the status of your transaction!"
                );
            } else {
                console.log(
                "Something went wrong when submitting your transaction:",
                err
                );
            }
            }
        );
        })
        .catch((err) => {
        console.log(" Promise failed:", err);
        });
}

// calling mintNFT function and provide tokenURI of nft-metadata.json uploaded on pinata
mintNFT(
    "https://gateway.pinata.cloud/ipfs/QmVDy5uHFH1yydLnUJm1tqM8aU3wzDpkjsR4fTMry1oX59"
    );


//     The hash of your transaction is:  0xfc3721f483b2e5d9b2f0f6cd734318e8df00306fe6e3ce6e5fcf0b1480227e89  
//     Check Alchemy's Mempool to view the status of your transaction!
//     NFT contract - 0x0cb0bd3814ef26fb94ff7c07b2ddc70dff7bffb5