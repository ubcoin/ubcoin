import ether from '../helpers/ether';
import tokens from '../helpers/tokens';
import {advanceBlock} from '../helpers/advanceToBlock';
import {duration, increaseTimeTo} from '../helpers/increaseTime';
import latestTime from '../helpers/latestTime';
import EVMRevert from '../helpers/EVMRevert';

require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(web3.BigNumber))
  .should();

export default function (Token, FoundersWallet, wallets) {
  let token;
  let foundersWallet;

  before(async function () {
    // Advance to the next block to correctly read time in the solidity "now" function interpreted by testrpc
    await advanceBlock();
  });

  beforeEach(async function () {
    this.startLockPeriod = 180;
    this.Period = 360;
    this.Duration = 90;

    token = await Token.new();
    foundersWallet = await FoundersWallet.new();

    await foundersWallet.setStartLockPeriod(this.startLockPeriod);
    await foundersWallet.setPeriod(this.Period);
    await foundersWallet.setDuration(this.Duration);
    await foundersWallet.setToken(token.address);
    await foundersWallet.transferOwnership(wallets[1]);
    await token.transferOwnership(wallets[1]);
  });

  it('should start', async function () {
    await token.mint(foundersWallet.address, tokens(1000), {from: wallets[1]});
    await foundersWallet.start({from: wallets[1]});
    const balance = await token.balanceOf(foundersWallet.address);
    const startBalance = await foundersWallet.startBalance();
    balance.should.bignumber.equal(startBalance);
    const started = await foundersWallet.started();
    assert.isTrue(started);
  });

  it('should not retrieve tokens if not started', async function () {
    await token.mint(foundersWallet.address, tokens(1000), {from: wallets[1]});
    await token.finishMinting({from: wallets[1]});
    await foundersWallet.retrieveTokens(wallets[3], {from: wallets[1]}).should.be.rejectedWith(EVMRevert);
  });

  it('should not retrieve tokens if not unlock', async function () {
    await token.mint(foundersWallet.address, tokens(1000), {from: wallets[1]});
    await foundersWallet.start({from: wallets[1]});
    await token.finishMinting({from: wallets[1]});
    await foundersWallet.retrieveTokens(wallets[3], {from: wallets[1]}).should.be.rejectedWith(EVMRevert);
  });

  it('should retrieve tokens by parts', async function () {
    await token.mint(foundersWallet.address, tokens(1000), {from: wallets[1]});
    await token.finishMinting({from: wallets[1]});
    await foundersWallet.start({from: wallets[1]});
    const startUnlock = await foundersWallet.startUnlock();
    await increaseTimeTo(startUnlock.add(duration.days(45)));
    await foundersWallet.retrieveTokens(wallets[3], {from: wallets[1]}).should.be.fulfilled;
    await increaseTimeTo(startUnlock.add(duration.days(90)));
    await foundersWallet.retrieveTokens(wallets[3], {from: wallets[1]}).should.be.fulfilled;
    await increaseTimeTo(startUnlock.add(duration.days(185)));
    await foundersWallet.retrieveTokens(wallets[3], {from: wallets[1]}).should.be.fulfilled;
    await increaseTimeTo(startUnlock.add(duration.days(280)));
    await foundersWallet.retrieveTokens(wallets[3], {from: wallets[1]}).should.be.fulfilled;
    await increaseTimeTo(startUnlock.add(duration.days(360)));
    await foundersWallet.retrieveTokens(wallets[3], {from: wallets[1]}).should.be.fulfilled;
    await increaseTimeTo(startUnlock.add(duration.days(365)));
    await foundersWallet.retrieveTokens(wallets[3], {from: wallets[1]}).should.be.fulfilled;
    const balance = await token.balanceOf(wallets[3]);
    balance.should.bignumber.equal(tokens(1000));
  });
}
