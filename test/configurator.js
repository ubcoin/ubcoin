import ether from './helpers/ether';
import tokens from './helpers/tokens';
import {advanceBlock} from './helpers/advanceToBlock';
import {increaseTimeTo, duration} from './helpers/increaseTime';
import latestTime from './helpers/latestTime';
import EVMRevert from './helpers/EVMRevert';

const should = require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(web3.BigNumber))
  .should();

const Configurator = artifacts.require('Configurator.sol');
const Token = artifacts.require('UBCoinToken.sol');
const PreICO = artifacts.require('PreICO.sol');
const ICO = artifacts.require('ICO.sol');
const TeamTokensWallet = artifacts.require('FreezeTokensWallet.sol');

contract('Configurator integration test', function (accounts) {
  let configurator;
  let token;
  let preico;
  let ico;
  let teamTokensWallet;

  const manager = '0xF1f94bAD54C8827C3B53754ad7dAa0FF5DCD527d';

  before(async function () {
    // Advance to the next block to correctly read time in the solidity "now" function interpreted by testrpc
    await advanceBlock();
    configurator = await Configurator.new();
    await configurator.deploy();

    const tokenAddress = await configurator.token();
    const preicoAddress = await configurator.preICO();
    const icoAddress = await configurator.ico();
    const teamTokensWalletAddress = await configurator.teamTokensWallet();

    token = await Token.at(tokenAddress);
    preico = await PreICO.at(preicoAddress);
    ico = await ICO.at(icoAddress);
    teamTokensWallet = await TeamTokensWallet.at(teamTokensWalletAddress);
  });

  it('contracts should have token address', async function () {
    const tokenOwner = await token.owner();
    tokenOwner.should.bignumber.equal(manager);
  });

  it('contracts should have preICO address', async function () {
    const preicoOwner = await preico.owner();
    preicoOwner.should.bignumber.equal(manager);
  });

  it('contracts should have ICO address', async function () {
    const icoOwner = await ico.owner();
    icoOwner.should.bignumber.equal(manager);
  });

  it('ICO should have team tokens wallet address', async function () {
    const teamWallet = await ico.teamTokensWallet();
    teamWallet.should.bignumber.equal(teamTokensWallet.address);
  });

  it('team tokens wallet should have ICO owner', async function () {
    const teamTokensWalletOwner = await teamTokensWallet.owner();
    teamTokensWalletOwner.should.bignumber.equal(ico.address);
  });

  it('preICO and ICO should have start time as described in README', async function () {
    const preicoStart = await preico.start();
    preicoStart.should.bignumber.equal((new Date('10 Mar 2018 00:00:00 GMT')).getTime() / 1000);
    const icoStart = await ico.start();
    icoStart.should.bignumber.equal((new Date('02 Apr 2018 00:00:00 GMT')).getTime() / 1000);
  });

  it ('presale period should be as described in README', async function () {
    const period = await preico.period();
    period.should.bignumber.equal(22);
  });

  it ('preICO and ICO should have price as described in README', async function () {
    const preicoPrice = await preico.price();
    preicoPrice.should.bignumber.equal(tokens(33334));
    const icoPrice = await ico.price();
    icoPrice.should.bignumber.equal(tokens(14286));
  });

  it ('preICO and ICO should have hardcap as described in README', async function () {
    const preicoHardcap = await preico.hardcap();
    preicoHardcap.should.bignumber.equal(ether(8500));
    const icoHardcap = await ico.hardcap();
    icoHardcap.should.bignumber.equal(ether(96000));
  });

  it ('preICO and ICO should have minimal insvested limit as described in README', async function () {
    const preicoMinInvest = await ico.minInvestedLimit();
    preicoMinInvest.should.bignumber.equal(ether(0.1));
    const icoMinInvest = await ico.minInvestedLimit();
    icoMinInvest.should.bignumber.equal(ether(0.1));
  });

  it ('bounty, team, reserved percent as described in README', async function () {
    const teamPercent = await ico.teamTokensPercent();
    teamPercent.should.bignumber.equal(12);
    const bountyPercent = await ico.bountyTokensPercent();
    bountyPercent.should.bignumber.equal(4);
    const reservedPercent = await ico.reservedTokensPercent();
    reservedPercent.should.bignumber.equal(34);
  });

  it ('preICO and ICO should have wallets as described in README', async function () {
    const preicoWallet = await preico.wallet();
    preicoWallet.should.bignumber.equal('0x00EE9d057f66754C7D92550F77Aeb0A87AE34B01');
    const icoWallet = await ico.wallet();
    icoWallet.should.bignumber.equal('0x5FB78D8B8f1161731BC80eF93CBcfccc5783356F');
  });

  it ('Bounty wallet and reserved wallet should be as described in README', async function () {
    const reservedWallet = await ico.reservedTokensWallet();
    reservedWallet.should.bignumber.equal('0xE1D1898660469797B22D348Ff67d54643d848295');
    const bountyWallet = await ico.bountyTokensWallet();
    bountyWallet.should.bignumber.equal('0xdAA156b6eA6b9737eA20c68Db4040B1182E487B6');
  });

  it ('team tokens wallet start lock period should be as described in README', async function () {
    const startLockPeriod = await teamTokensWallet.startLockPeriod();
    startLockPeriod.should.bignumber.equal(duration.days(180));
  });

  it ('team tokens wallet period should be as described in README', async function () {
    const period = await teamTokensWallet.period();
    period.should.bignumber.equal(duration.days(360));
  });

  it ('team tokens wallet duration should be as described in README', async function () {
    const Duration = await teamTokensWallet.duration();
    Duration.should.bignumber.equal(duration.days(90));
  });

});

