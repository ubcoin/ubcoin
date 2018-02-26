import ether from './helpers/ether';
import tokens from './helpers/tokens';
import unixTime from './helpers/unixTime';
import {duration} from './helpers/increaseTime';

import capped from './ico/capped';
import common from './ico/common';
import milestonebonus from './ico/milestonebonus';
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
  this.start = unixTime('01 Apr 2018 00:00:00 GMT');
  this.period = 60;
  this.price = tokens(14286);
  this.hardcap = ether(96000);
  this.minInvestedLimit = ether(0.1);
  this.wallet = '0x98882D176234AEb736bbBDB173a8D24794A3b085';
  this.BountyTokensWallet = '0x28732f6dc12606D529a020b9ac04C9d6f881D3c5';
  this.ReservedTokensWallet = '0x28732f6dc12606D529a020b9ac04C9d6f881D3c5';
  this.TeamTokensPercent = 12;
  this.BountyTokensPercent = 4;
  this.ReservedTokensPercent = 34;

  // variables for additional testing convinience
  this.end = this.start + duration.days(this.period);
  this.beforeStart = this.start - duration.seconds(10);
  this.afterEnd = this.end + duration.seconds(1);
}
