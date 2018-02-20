pragma solidity ^0.4.18;

import './MintableToken.sol';

contract VestarinToken is MintableToken {	
    
  string public constant name = "Vestarin";
   
  string public constant symbol = "VST";
    
  uint32 public constant decimals = 18;

  mapping (address => uint) public locked;

  function transfer(address _to, uint256 _value) public returns (bool) {
    require(locked[msg.sender] < now);
    return super.transfer(_to, _value);
  }

  function transferFrom(address _from, address _to, uint256 _value) public returns (bool) {
    require(locked[_from] < now);
    return super.transferFrom(_from, _to, _value);
  }
  
  function lock(address addr, uint periodInDays) public {
    require(locked[addr] < now && (msg.sender == saleAgent || msg.sender == addr));
    locked[addr] = now + periodInDays * 1 days;
  }

}
