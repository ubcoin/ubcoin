pragma solidity ^0.4.18;

import './ownership/Ownable.sol';
import './MintableToken.sol';
import './UBCoinToken.sol';
import './PreICO.sol';
import './ICO.sol';
import './FreezeTokensWallet.sol';

contract Configurator is Ownable {

  MintableToken public token;

  PreICO public preICO;

  ICO public ico;

  FreezeTokensWallet public teamTokensWallet;

  function deploy() public onlyOwner {

    token = new UBCoinToken();

    preICO = new PreICO();

    preICO.setWallet(0xa86780383E35De330918D8e4195D671140A60A74);
    preICO.setStart(1518393600);
    preICO.setPeriod(15);
    preICO.setPrice(33334000000000000000000);
    preICO.setMinInvestedLimit(100000000000000000);
    preICO.setToken(token);
    preICO.setHardcap(8500000000000000000000);
    token.setSaleAgent(preICO);

    ico = new ICO();

    ico.addMilestone(20, 40);
    ico.addMilestone(20, 20);
    ico.addMilestone(20, 0);
    ico.setMinInvestedLimit(100000000000000000);
    ico.setToken(token);
    ico.setPrice(14286000000000000000000);
    ico.setWallet(0x98882D176234AEb736bbBDB173a8D24794A3b085);
    ico.setBountyTokensWallet(0x28732f6dc12606D529a020b9ac04C9d6f881D3c5);
    ico.setReservedTokensWallet(0x28732f6dc12606D529a020b9ac04C9d6f881D3c5);
    ico.setStart(1520640000);
    ico.setHardcap(96000000000000000000000);
    ico.setTeamTokensPercent(12);
    ico.setBountyTokensPercent(7);
    ico.setReservedTokensPercent(31);

    teamTokensWallet = new FreezeTokensWallet();
    teamTokensWallet.setStartLockPeriod(24);
    teamTokensWallet.setPeriod(48);
    teamTokensWallet.setDuration(3);
    teamTokensWallet.transferOwnership(ico);

    ico.setTeamTokensWallet(teamTokensWallet);

    preICO.setNextSaleAgent(ico);

    address manager = 0x675eDE27cafc8Bd07bFCDa6fEF6ac25031c74766;

    token.transferOwnership(manager);
    preICO.transferOwnership(manager);
    ico.transferOwnership(manager);
  }

}

