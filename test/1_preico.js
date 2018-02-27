import ether from './helpers/ether';
import tokens from './helpers/tokens';
import unixTime from './helpers/unixTime';
import {duration} from './helpers/increaseTime';

import capped from './preico/capped';
import common from './preico/common';
import additional from './preico/additional';

const token = artifacts.require('UBCoinToken.sol');
const crowdsale = artifacts.require('PreICO.sol');

contract('PreICO - common test', function (accounts) {
  before(config);
  common(token, crowdsale, accounts);
});

contract('PreICO - capped crowdsale test', function (accounts) {
  before(config);
  capped(token, crowdsale, accounts);
});

contract('PreICO - additional features test', function (accounts) {
  before(config);
  additional(token, crowdsale, accounts);
});

function config() {
  // variables list based on info from README
  this.start = unixTime('01 Mar 2018 00:00:00 GMT');
  this.period = 15;
  this.price = tokens(33334);
  this.hardcap = ether(8500);
  this.minInvestedLimit = ether(0.1);
  this.wallet = '0xa86780383E35De330918D8e4195D671140A60A74';

  // variables for additional testing convinience
  this.end = this.start + duration.days(this.period);
  this.beforeStart = this.start - duration.seconds(10);
  this.afterEnd = this.end + duration.seconds(1);
}
