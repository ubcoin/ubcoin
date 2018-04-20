import ether from './helpers/ether';
import tokens from './helpers/tokens';
import unixTime from './helpers/unixTime';
import {duration} from './helpers/increaseTime';

import callback from './testcallback/callback';

const token = artifacts.require('UBCoinToken.sol');
const crowdsale = artifacts.require('ICO.sol');
const callbacktest = artifacts.require('CallbackTest.sol');

contract('Callback test', function (accounts) {
  before(config);
  callback(token, crowdsale, callbacktest, accounts);
});

function config() {
  // variables list based on info from README
  this.start = unixTime('20 May 2018 00:00:00 GMT');
  this.period = 60;
  this.price = tokens(14286);
  this.hardcap = ether(96000);
  this.minInvestedLimit = ether(0.1);
  this.wallet = '0x5FB78D8B8f1161731BC80eF93CBcfccc5783356F';
  this.BountyTokensWallet = '0xdAA156b6eA6b9737eA20c68Db4040B1182E487B6';
  this.ReservedTokensWallet = '0xE1D1898660469797B22D348Ff67d54643d848295';
  this.TeamTokensPercent = 12;
  this.BountyTokensPercent = 4;
  this.ReservedTokensPercent = 34;

  // variables for additional testing convinience
  this.end = this.start + duration.days(this.period);
  this.beforeStart = this.start - duration.seconds(10);
  this.afterEnd = this.end + duration.seconds(1);
}
