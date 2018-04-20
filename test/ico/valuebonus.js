import ether from '../helpers/ether';
import tokens from '../helpers/tokens';
import {advanceBlock} from '../helpers/advanceToBlock';
import {increaseTimeTo, duration} from '../helpers/increaseTime';
import latestTime from '../helpers/latestTime';

require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(web3.BigNumber))
  .should();

export default function (Token, Crowdsale, wallets) {
  let token;
  let crowdsale;
  const valuebonuses = [
    {value: 20000000000000000000, bonus: 50},
    {value: 50000000000000000000, bonus: 65},
    {value: 300000000000000000000, bonus: 80}
  ];

  before(async function () {
    // Advance to the next block to correctly read time in the solidity "now" function interpreted by testrpc
    await advanceBlock();
  });

  before(async function () {
    token = await Token.new();
    crowdsale = await Crowdsale.new();
    await token.setSaleAgent(crowdsale.address);
    await crowdsale.setToken(token.address);
    await crowdsale.setStart(latestTime());
    await crowdsale.setPrice(this.price);
    await crowdsale.setHardcap(this.hardcap);
    await crowdsale.setMinInvestedLimit(this.minInvestedLimit);
    await crowdsale.addValueBonus(20000000000000000000, 50);
    await crowdsale.addValueBonus(50000000000000000000, 65);
    await crowdsale.addValueBonus(300000000000000000000, 80);
    await crowdsale.addMilestone(20, 0);
    await crowdsale.addMilestone(20, 0);
    await crowdsale.addMilestone(20, 0);
    await crowdsale.addMilestone(20, 0);
    await crowdsale.addMilestone(20, 0);
    await crowdsale.addMilestone(4, 0);
    await crowdsale.setWallet(this.wallet);
    await crowdsale.setBountyTokensWallet(this.BountyTokensWallet);
    await crowdsale.setReservedTokensWallet(this.ReservedTokensWallet);
    await crowdsale.setTeamTokensPercent(this.TeamTokensPercent);
    await crowdsale.setBountyTokensPercent(this.BountyTokensPercent);
    await crowdsale.setReservedTokensPercent(this.ReservedTokensPercent);
  });

  valuebonuses.forEach((valuebonus, i) => {
    it(`should add ${valuebonus.bonus}% bonus for investment over ${valuebonus.value / 1000000000000000000} eth`, async function () {
      await crowdsale.sendTransaction({value: valuebonus.value, from: wallets[i]});
      const balance = await token.balanceOf(wallets[i]);
      const tokenamount = this.price.mul(valuebonus.value).div(ether(1)).times(1 + valuebonus.bonus / this.PercentRate);
      balance.should.be.bignumber.equal(tokenamount);
    });
  });

}
