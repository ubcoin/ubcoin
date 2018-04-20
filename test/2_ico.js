import ether from './helpers/ether';
import tokens from './helpers/tokens';
import unixTime from './helpers/unixTime';
import {duration} from './helpers/increaseTime';

import capped from './ico/capped';
import common from './ico/common';
import milestonebonus from './ico/milestonebonus';
import valuebonus from './ico/valuebonus';
import bounty from './ico/bounty';
import additional from './ico/additional';

const token = artifacts.require('UBCoinToken.sol');
const crowdsale = artifacts.require('ICO.sol');
const teamwallet = artifacts.require('FreezeTokensWallet.sol');

contract('ICO - common test', function (accounts) {
  before(config);
  common(token, crowdsale, teamwallet, accounts);
});

contract('ICO - capped crowdsale test', function (accounts) {
  before(config);
  capped(token, crowdsale, accounts);
});

contract('ICO - milestone bonus test', function (accounts) {
  before(config);
  milestonebonus(token, crowdsale, accounts);
});

contract('ICO - value bonus test', function (accounts) {
  before(config);
  valuebonus(token, crowdsale, accounts);
});

contract('ICO - bounty test', function (accounts) {
  before(config);
  bounty(token, crowdsale, teamwallet, accounts);
});

contract('ICO - additional features test', function (accounts) {
  before(config);
  additional(token, crowdsale, teamwallet, accounts);
});

function config() {
  // variables list based on info from README
  this.start = unixTime('20 May 2018 00:00:00 GMT');
  this.period = 104;
  this.price = tokens(14286);
  this.hardcap = ether(96000);
  this.minInvestedLimit = ether(0.1);
  this.wallet = '0x5FB78D8B8f1161731BC80eF93CBcfccc5783356F';
  this.BountyTokensWallet = '0xdAA156b6eA6b9737eA20c68Db4040B1182E487B6';
  this.ReservedTokensWallet = '0xE1D1898660469797B22D348Ff67d54643d848295';
  this.TeamTokensPercent = 12;
  this.BountyTokensPercent = 4;
  this.ReservedTokensPercent = 34;
  this.PercentRate = 100;

  // variables for additional testing convinience
  this.end = this.start + duration.days(this.period);
  this.beforeStart = this.start - duration.seconds(10);
  this.afterEnd = this.end + duration.seconds(1);
}
