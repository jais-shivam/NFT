async function main() {
    const MyNFT = await ethers.getContractFactory("NFT");
  
    // Start deployment, returning a promise that resolves to a contract object
    const myNFT = await MyNFT.deploy();
    console.log("Contract deployed to address:", myNFT.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
    
  //Contract deployed to address: 0x0Cb0bD3814ef26fb94ff7C07B2DDC70dFF7bffb5