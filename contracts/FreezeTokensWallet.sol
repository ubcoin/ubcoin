pragma solidity 0.4.18;

import './ownership/Ownable.sol';
import './math/SafeMath.sol';
import './MintableToken.sol';

contract FreezeTokensWallet is Ownable {

  using SafeMath for uint256;

  MintableToken public token;

  bool public started;

  uint public startLockPeriod = 25 weeks;

  uint public period = 12 weeks;

  uint public duration = 3 weeks;

  uint public startUnlock;

  uint public retrievedTokens;

  uint public startBalance;

  modifier notStarted() {
    require(!started);
    _;
  }

  function setPeriod(uint newPeriod) public onlyOwner notStarted {
    period = newPeriod * 1 weeks;
  }

  function setDuration(uint newDuration) public onlyOwner notStarted {
    duration = newDuration * 1 weeks;
  }

  function setStartLockPeriod(uint newStartLockPeriod) public onlyOwner notStarted {
    startLockPeriod = newStartLockPeriod * 1 weeks;
  }
  
  function setToken(address newToken) public onlyOwner notStarted {
    token = MintableToken(newToken);
  }

  function start() public onlyOwner notStarted {
    startUnlock = now + startLockPeriod;
    retrievedTokens = 0;
    startBalance = token.balanceOf(this);
    started = true;
  }

  function retrieveTokens(address to) public onlyOwner {
    require(started && now >= startUnlock);
    if (now >= startUnlock + period) {
      token.transfer(to, token.balanceOf(this));
    } else {
      uint parts = period.div(duration);
      uint tokensByPart = startBalance.div(parts);
      uint timeSinceStart = now.sub(startLockPeriod);
      uint pastParts = timeSinceStart.div(duration);
      uint tokensToRetrieveSinceStart = pastParts.mul(tokensByPart);
      uint tokensToRetrieve = tokensToRetrieveSinceStart.sub(retrievedTokens);
      if(tokensToRetrieve > 0) {
        retrievedTokens = retrievedTokens.add(tokensToRetrieve);
        token.transfer(to, tokensToRetrieve);
      }
    }
  }

}

