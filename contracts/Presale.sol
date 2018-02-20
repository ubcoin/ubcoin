pragma solidity ^0.4.18;

import './CommonSale.sol';
import './Mainsale.sol';

contract Presale is CommonSale {

  Mainsale public mainsale;

  function setMainsale(address newMainsale) public onlyOwner {
    mainsale = Mainsale(newMainsale);
  }

  function finishMinting() public whenNotPaused onlyOwner {
    token.setSaleAgent(mainsale);
  }

  function() external payable {
    createTokens();
  }

}
