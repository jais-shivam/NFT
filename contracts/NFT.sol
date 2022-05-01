//SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NFT is ERC721URIStorage, Ownable{
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds; //Provides Id to digital asset

    constructor() ERC721("ACE Award Certificate","ACE"){} //ERC721("NFT name","NFT symbol"){}

    // Mint NFT
    function mintNFT(address recipient, string memory tokenURI) public returns(uint256){
        _tokenIds.increment();

        uint256 newItemId= _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI); //Digital asset is being linked with ID

        return newItemId;
    }
}
