
import ether from './helpers/ether'
import {advanceBlock} from './helpers/advanceToBlock'
import {increaseTimeTo, duration} from './helpers/increaseTime'
import latestTime from './helpers/latestTime'
import EVMThrow from './helpers/EVMThrow'

const BigNumber = web3.BigNumber

const should = require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should()

const Configurator = artifacts.require('Configurator')

const Token = artifacts.require('VestarinToken')

const Mainsale = artifacts.require('Mainsale')

const Presale = artifacts.require('Presale')

contract('Crowdsale', function(wallets) {

  before(async function() {
    await advanceBlock()
  })
  
  beforeEach(async function () {
    this.configurator = await Configurator.new()
    await this.configurator.deploy().should.be.fulfilled
    this.token = Token.at(await this.configurator.token())
    this.presale = Presale.at(await this.configurator.presale())
    this.mainsale = Mainsale.at(await this.configurator.mainsale())
  })	 
  
  it('Integration test', async function () {
  
    const owner = wallets[0]

    const defInvestor = wallets[1]
 
    const extInvestorPresale = wallets[2]

    const defInvestor1 = wallets[3]

    const extInvestorPresale1 = wallets[4]

    const defInvestor2 = wallets[5]

    const extInvestorPresale2 = wallets[6]

    const defInvestor3 = wallets[7]

    const extInvestorPresale3 = wallets[8]

    const defValue = ether(3)

    const jumpValue = ether(5)

    const jumpValue1 = ether(5000)

    const masterWallet = "0x95EA6A4ec9F80436854702e5F05d238f27166A03"

    const slaveWallet = "0x070EcC35a3212D76ad443d529216a452eAA35E3D"

    const masterWalletK = new BigNumber(0.7)

    const slaveWalletK = new BigNumber(0.3)

    console.log('Rejects before start presale')
    await this.presale.sendTransaction({from: defInvestor, value: defValue}).should.be.rejectedWith(EVMThrow)
    await this.presale.directMint(defInvestor, defValue, {from: owner}).should.be.rejectedWith(EVMThrow)

    console.log('Increase time to presale')
    const presaleStart = 1517317200 
    await increaseTimeTo(presaleStart)

    console.log('Invest 3 ether')
    await this.presale.sendTransaction({from: defInvestor, value: defValue}).should.be.fulfilled

    console.log('Check presale investor balance')
    const presalePrice = new BigNumber(300)
    var minted = defValue.mul(presalePrice)
    var balanceOf = await this.token.balanceOf(defInvestor)
    balanceOf.should.be.bignumber.equal(minted)

    console.log('Check summary presale minted')
    var summaryMinted = minted
    var totalSupply = await this.token.totalSupply()
    totalSupply.should.be.bignumber.equal(summaryMinted) 

    console.log('Check master wallet')
    var curMasterBalance = await web3.eth.getBalance(masterWallet)
    var localMasterBalance = defValue.mul(masterWalletK)
    curMasterBalance.should.be.bignumber.equal(curMasterBalance)

    console.log('Check slave wallet')
    var curSlaveBalance = await web3.eth.getBalance(slaveWallet)
    var localSlaveBalance = defValue.mul(slaveWalletK)
    curSlaveBalance.should.be.bignumber.equal(curSlaveBalance)

    console.log('Presale direct mint')
    await this.presale.directMint(extInvestorPresale, defValue, {from: owner}).should.be.fulfilled

    console.log('Check external investor balance')
    minted = defValue.mul(presalePrice)
    balanceOf = await this.token.balanceOf(extInvestorPresale)
    balanceOf.should.be.bignumber.equal(minted)

    console.log('Check summary presale minted')
    summaryMinted = summaryMinted.add(minted)
    totalSupply = await this.token.totalSupply()
    totalSupply.should.be.bignumber.equal(summaryMinted) 

    console.log('Check rejection of transfer operation during presale')
    const transferredK = new BigNumber(0.5)
    var transferredValue = minted.mul(transferredK)
    await this.token.transfer(defInvestor, transferredValue, {from: extInvestorPresale}).should.be.rejectedWith(EVMThrow)

    console.log('Increase time to end of presale')
    const day = 60 * 60 * 24
    const presaleEnd = presaleStart + 30*day
    await increaseTimeTo(presaleEnd)
   
    console.log('Check invest rejection during time between presale and ICO')
    await this.presale.sendTransaction({from: defInvestor, value: defValue}).should.be.rejectedWith(EVMThrow)

    console.log('Check external invest rejection during time between presale and ICO')
    await this.presale.directMint(extInvestorPresale, defValue, {from: owner}).should.be.rejectedWith(EVMThrow)

    console.log('Check transfer rejection during time between presale and ICO')
    await this.token.transfer(defInvestor, transferredValue, {from: extInvestorPresale}).should.be.rejectedWith(EVMThrow)

    console.log("Finishing presale")
    await this.presale.finishMinting().should.be.fulfilled

    console.log('Check invest rejection during time between presale and ICO')
    await this.presale.sendTransaction({from: defInvestor, value: defValue}).should.be.rejectedWith(EVMThrow)

    console.log('Check external invest rejection during time between presale and ICO')
    await this.presale.directMint(extInvestorPresale, defValue, {from: owner}).should.be.rejectedWith(EVMThrow)

    console.log('Check transfer rejection during time between presale and ICO')
    await this.token.transfer(defInvestor, transferredValue, {from: extInvestorPresale}).should.be.rejectedWith(EVMThrow)

    console.log('Increase time to start of ICO')
    const mainsaleStart = 1525352400
    await increaseTimeTo(mainsaleStart)

    console.log('Invest 3 ether')
    await this.mainsale.sendTransaction({from: defInvestor1, value: defValue}).should.be.fulfilled
    
    console.log('Check mainsale investor balance')
    const mainsale1Price = new BigNumber(200)
    minted = defValue.mul(mainsale1Price)
    balanceOf = await this.token.balanceOf(defInvestor1)
    balanceOf.should.be.bignumber.equal(minted)

    console.log('Check summary mainsale minted')
    summaryMinted = summaryMinted.add(minted)
    totalSupply = await this.token.totalSupply()
    totalSupply.should.be.bignumber.equal(summaryMinted)
    
    console.log('Check master wallet')
    curMasterBalance = await web3.eth.getBalance(masterWallet)
    localMasterBalance = localMasterBalance.add(defValue.mul(masterWalletK))
    curMasterBalance.should.be.bignumber.equal(curMasterBalance)

    console.log('Check slave wallet')
    curSlaveBalance = await web3.eth.getBalance(slaveWallet)
    localSlaveBalance = localSlaveBalance.add(defValue.mul(slaveWalletK))
    curSlaveBalance.should.be.bignumber.equal(curSlaveBalance)

    console.log('Presale direct mint')
    await this.mainsale.directMint(extInvestorPresale1, defValue, {from: owner}).should.be.fulfilled

    console.log('Check external investor balance')
    minted = defValue.mul(mainsale1Price)
    balanceOf = await this.token.balanceOf(extInvestorPresale1)
    balanceOf.should.be.bignumber.equal(minted)

    console.log('Check summary mainsale minted')
    summaryMinted = summaryMinted.add(minted)
    totalSupply = await this.token.totalSupply()
    totalSupply.should.be.bignumber.equal(summaryMinted)

    console.log('Check rejection of transfer operation during mainsale 1')
    transferredValue = minted.mul(transferredK)
    await this.token.transfer(defInvestor1, transferredValue, {from: extInvestorPresale1}).should.be.rejectedWith(EVMThrow)

    console.log('Invest 5 ether')
    await this.mainsale.sendTransaction({from: defInvestor2, value: jumpValue}).should.be.fulfilled
    
    console.log('Check mainsale investor balance')
    minted = jumpValue.mul(mainsale1Price)
    balanceOf = await this.token.balanceOf(defInvestor2)
    balanceOf.should.be.bignumber.equal(minted)

    console.log('Check summary mainsale minted')
    summaryMinted = summaryMinted.add(minted)
    totalSupply = await this.token.totalSupply()
    totalSupply.should.be.bignumber.equal(summaryMinted)
    
    console.log('Check master wallet')
    curMasterBalance = await web3.eth.getBalance(masterWallet)
    localMasterBalance = localMasterBalance.add(jumpValue.mul(masterWalletK))
    curMasterBalance.should.be.bignumber.equal(curMasterBalance)

    console.log('Check slave wallet')
    curSlaveBalance = await web3.eth.getBalance(slaveWallet)
    localSlaveBalance = localSlaveBalance.add(jumpValue.mul(slaveWalletK))
    curSlaveBalance.should.be.bignumber.equal(curSlaveBalance)

    console.log('Presale direct mint')
    await this.mainsale.directMint(extInvestorPresale2, jumpValue1, {from: owner}).should.be.fulfilled

    console.log('Check external investor balance')
    minted = jumpValue1.mul(mainsale1Price)
    balanceOf = await this.token.balanceOf(extInvestorPresale2)
    balanceOf.should.be.bignumber.equal(minted)

    console.log('Check summary mainsale minted')
    summaryMinted = summaryMinted.add(minted)
    totalSupply = await this.token.totalSupply()
    totalSupply.should.be.bignumber.equal(summaryMinted)

    console.log('Check rejection of transfer operation during mainsale 1')
    transferredValue = minted.mul(transferredK)
    await this.token.transfer(defInvestor2, transferredValue, {from: extInvestorPresale2}).should.be.rejectedWith(EVMThrow)

    console.log('Invest 3 ether secnd stage')
    await this.mainsale.sendTransaction({from: defInvestor3, value: defValue}).should.be.fulfilled
    
    console.log('Check mainsale investor balance')
    const mainsale2Price = new BigNumber(180)
    minted = defValue.mul(mainsale2Price)
    balanceOf = await this.token.balanceOf(defInvestor3)
    balanceOf.should.be.bignumber.equal(minted)

    console.log('Check summary mainsale minted')
    summaryMinted = summaryMinted.add(minted)
    totalSupply = await this.token.totalSupply()
    totalSupply.should.be.bignumber.equal(summaryMinted)
    
    console.log('Check master wallet')
    curMasterBalance = await web3.eth.getBalance(masterWallet)
    localMasterBalance = localMasterBalance.add(defValue.mul(masterWalletK))
    curMasterBalance.should.be.bignumber.equal(curMasterBalance)

    console.log('Check slave wallet')
    curSlaveBalance = await web3.eth.getBalance(slaveWallet)
    localSlaveBalance = localSlaveBalance.add(defValue.mul(slaveWalletK))
    curSlaveBalance.should.be.bignumber.equal(curSlaveBalance)

    console.log('Presale direct mint')
    await this.mainsale.directMint(extInvestorPresale3, defValue, {from: owner}).should.be.fulfilled

    console.log('Check external investor balance')
    minted = defValue.mul(mainsale2Price)
    balanceOf = await this.token.balanceOf(extInvestorPresale3)
    balanceOf.should.be.bignumber.equal(minted)

    console.log('Check summary mainsale minted')
    summaryMinted = summaryMinted.add(minted)
    totalSupply = await this.token.totalSupply()
    totalSupply.should.be.bignumber.equal(summaryMinted)

    console.log('Check rejection of transfer operation during mainsale 3')
    transferredValue = minted.mul(transferredK)
    await this.token.transfer(defInvestor3, transferredValue, {from: extInvestorPresale3}).should.be.rejectedWith(EVMThrow)

    console.log("Finishing mainsale")
    await this.mainsale.finishMinting().should.be.fulfilled

    console.log('Check invest rejection after ICO')
    await this.presale.sendTransaction({from: defInvestor, value: defValue}).should.be.rejectedWith(EVMThrow)

    console.log('Check external invest rejection after ICO')
    await this.presale.directMint(extInvestorPresale, defValue, {from: owner}).should.be.rejectedWith(EVMThrow)

    console.log('Check transfer rejection during after ICO')
    await this.token.transfer(defInvestor, transferredValue, {from: extInvestorPresale}).should.be.fulfilled

  })

})
