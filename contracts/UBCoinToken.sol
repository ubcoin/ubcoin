pragma solidity ^0.4.18;

import './token/ERC20/MintableToken.sol';
import './ReceivingContractCallback.sol';

contract UBCoinToken is MintableToken {

  string public constant name = "UBCoin";

  string public constant symbol = "UBC";

  uint32 public constant decimals = 18;

  address public saleAgent;

  mapping (address => uint) public locked;

  mapping(address => bool)  public registeredCallbacks;

  modifier canTransfer() {
    require(msg.sender == owner || msg.sender == saleAgent || mintingFinished);
    _;
  }

  modifier onlyOwnerOrSaleAgent() {
    require(msg.sender == owner || msg.sender == saleAgent);
    _;
  }

  function setSaleAgent(address newSaleAgnet) public onlyOwnerOrSaleAgent {
    saleAgent = newSaleAgnet;
  }

  function mint(address _to, uint256 _amount) public onlyOwnerOrSaleAgent canMint returns (bool) {
    totalSupply_ = totalSupply_.add(_amount);
    balances[_to] = balances[_to].add(_amount);
    Mint(_to, _amount);
    return true;
  }

  function finishMinting() public onlyOwnerOrSaleAgent canMint returns (bool) {
    mintingFinished = true;
    MintFinished();
    return true;
  }

  function transfer(address _to, uint256 _value) public canTransfer returns (bool) {
    require(locked[msg.sender] < now);
    return processCallback(super.transfer(_to, _value), msg.sender, _to, _value);
  }

  function transferFrom(address _from, address _to, uint256 _value) public canTransfer returns (bool) {
    require(locked[_from] < now);
    return processCallback(super.transferFrom(_from, _to, _value), _from, _to, _value);
  }

  function lock(address addr, uint periodInDays) public {
    require(locked[addr] < now && (msg.sender == saleAgent || msg.sender == addr));
    locked[addr] = now.add(periodInDays * 1 days);
  }

  function registerCallback(address callback) public onlyOwner {
    registeredCallbacks[callback] = true;
  }

  function deregisterCallback(address callback) public onlyOwner {
    registeredCallbacks[callback] = false;
  }

  function processCallback(bool result, address from, address to, uint value) internal returns(bool) {
    if (result && registeredCallbacks[to]) {
      ReceivingContractCallback targetCallback = ReceivingContractCallback(to);
      targetCallback.tokenFallback(from, value);
    }
    return result;
  }

}
