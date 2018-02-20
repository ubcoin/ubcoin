pragma solidity ^0.4.18;

import 'zeppelin-solidity/contracts/ownership/Ownable.sol';

import './UBCoinToken.sol';
import './Presale.sol';
import './Mainsale.sol';

contract Configurator is Ownable {

  UBCoinToken public token; 

  Presale public presale;

  Mainsale public mainsale;

  function deploy() public onlyOwner {
    owner = 0x95EA6A4ec9F80436854702e5F05d238f27166A03;

    token = new UBCoinToken();

    presale = new Presale();

    presale.setToken(token);
    presale.addStage(5000,300);
    presale.setMasterWallet(0x95EA6A4ec9F80436854702e5F05d238f27166A03);
    presale.setSlaveWallet(0x070EcC35a3212D76ad443d529216a452eAA35E3D);
    presale.setSlaveWalletPercent(30);
    presale.setStart(1517317200);
    presale.setPeriod(30);
    presale.setMinPrice(100000000000000000);
    token.setSaleAgent(presale);	

    mainsale = new Mainsale();

    mainsale.setToken(token);
    mainsale.addStage(5000,200);
    mainsale.addStage(5000,180);
    mainsale.addStage(10000,170);
    mainsale.addStage(20000,160);
    mainsale.addStage(20000,150);
    mainsale.addStage(40000,130);
    mainsale.setMasterWallet(0x95EA6A4ec9F80436854702e5F05d238f27166A03);
    mainsale.setSlaveWallet(0x070EcC35a3212D76ad443d529216a452eAA35E3D);
    mainsale.setSlaveWalletPercent(30);
    mainsale.setFoundersTokensWallet(0x95EA6A4ec9F80436854702e5F05d238f27166A03);
    mainsale.setBountyTokensWallet(0x95EA6A4ec9F80436854702e5F05d238f27166A03);
    mainsale.setStart(1525352400);
    mainsale.setPeriod(30);
    mainsale.setLockPeriod(90);
    mainsale.setMinPrice(100000000000000000);
    mainsale.setFoundersTokensPercent(13);
    mainsale.setBountyTokensPercent(5);

    presale.setMainsale(mainsale);

    token.transferOwnership(owner);
    presale.transferOwnership(owner);
    mainsale.transferOwnership(owner);
  }

}

