import ether from '../helpers/ether';
import tokens from '../helpers/tokens';
import {advanceBlock} from '../helpers/advanceToBlock';
import {increaseTimeTo, duration} from '../helpers/increaseTime';
import latestTime from '../helpers/latestTime';
import EVMRevert from '../helpers/EVMRevert';

require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(web3.BigNumber))
  .should();

export default function (Token, Crowdsale, Teamwallet, wallets) {
  let token;
  let crowdsale;
  let teamwallet;

  before(async function () {
    // Advance to the next block to correctly read time in the solidity "now" function interpreted by testrpc
    await advanceBlock();
  });

  beforeEach(async function () {
    token = await Token.new();
    crowdsale = await Crowdsale.new();
    teamwallet = await Teamwallet.new();
    await token.setSaleAgent(crowdsale.address);
    await crowdsale.setToken(token.address);
    await crowdsale.setStart(latestTime());
    await crowdsale.setPrice(this.price);
    await crowdsale.setHardcap(this.hardcap);
    await crowdsale.setMinInvestedLimit(this.minInvestedLimit);
    await crowdsale.addValueBonus(20000000000000000000, 50);
    await crowdsale.addValueBonus(50000000000000000000, 65);
    await crowdsale.addValueBonus(300000000000000000000, 80);
    await crowdsale.addMilestone(20, 40);
    await crowdsale.addMilestone(20, 25);
    await crowdsale.addMilestone(20, 20);
    await crowdsale.addMilestone(20, 15);
    await crowdsale.addMilestone(20, 8);
    await crowdsale.addMilestone(4, 0);
    await crowdsale.setWallet(this.wallet);
    await crowdsale.setBountyTokensWallet(wallets[3]);
    await crowdsale.setReservedTokensWallet(wallets[4]);
    await crowdsale.setTeamTokensPercent(this.TeamTokensPercent);
    await crowdsale.setBountyTokensPercent(this.BountyTokensPercent);
    await crowdsale.setReservedTokensPercent(this.ReservedTokensPercent);
    await crowdsale.setTeamTokensWallet(teamwallet.address);
    await teamwallet.setStartLockPeriod(24);
    await teamwallet.setPeriod(48);
    await teamwallet.setDuration(3);
    await teamwallet.setToken(token.address);
    await teamwallet.transferOwnership(crowdsale.address);
  });

  it('should correctly calculate bonuses for founders and bounty', async function () {
    await crowdsale.sendTransaction({value: ether(1), from: wallets[1]});
    await crowdsale.sendTransaction({value: ether(99), from: wallets[2]});
    const owner = await crowdsale.owner();
    await crowdsale.finish({from: owner});

    const firstInvestorTokens = await token.balanceOf(wallets[1]);
    const secondInvestorTokens = await token.balanceOf(wallets[2]);
    const bountyTokens = await token.balanceOf(wallets[3]);
    const reservedTokens = await token.balanceOf(wallets[4]);
    const teamTokens = await token.balanceOf(teamwallet.address);
    const totalTokens = firstInvestorTokens
      .plus(secondInvestorTokens)
      .plus(teamTokens)
      .plus(bountyTokens)
      .plus(reservedTokens);
    assert.equal(teamTokens.div(totalTokens), this.TeamTokensPercent / 100);
    assert.equal(bountyTokens.div(totalTokens), this.BountyTokensPercent / 100);
    assert.equal(reservedTokens.div(totalTokens), this.ReservedTokensPercent / 100);

  });
}
