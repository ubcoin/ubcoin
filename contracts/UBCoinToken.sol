pragma solidity ^0.4.18;

import './MintableToken.sol';

contract UBCoinToken is MintableToken {

  string public constant name = "UBCoin";

  string public constant symbol = "UBC";

  uint32 public constant decimals = 18;

}
