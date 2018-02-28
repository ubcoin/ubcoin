pragma solidity ^0.4.18;

import './CommonSale.sol';

contract WhiteListFeature is CommonSale {

  mapping(address => bool)  public whiteList;

  function addToWhiteList(address _address) public onlyDirectMintAgentOrOwner {
    whiteList[_address] = true;
  }

  function deleteFromWhiteList(address _address) public onlyDirectMintAgentOrOwner {
    whiteList[_address] = false;
  }

}
