pragma solidity ^0.4.18;

import './NextSaleAgentFeature.sol';
import './WhiteListFeature.sol';

contract PreICO is NextSaleAgentFeature, WhiteListFeature {

  uint public period;

  function calculateTokens(uint _invested) internal returns(uint) {
    return _invested.mul(price).div(1 ether);
  }

  function setPeriod(uint newPeriod) public onlyOwner {
    period = newPeriod;
  }

  function finish() public onlyOwner {
    token.setSaleAgent(nextSaleAgent);
  }

  function endSaleDate() public view returns(uint) {
    return start.add(period * 1 days);
  }
  
  function fallback() internal minInvestLimited(msg.value) returns(uint) {
    require(now >= start && now < endSaleDate());
    require(whiteList[msg.sender]);
    wallet.transfer(msg.value);
    return mintTokensByETH(msg.sender, msg.value);
  }
  
}
