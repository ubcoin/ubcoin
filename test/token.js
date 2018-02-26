import additional from './token/additional';
import basic from './token/basic';
import mintable from './token/mintable';
import ownable from './token/ownable';
import standard from './token/standard';

const token = artifacts.require('UBCoinToken.sol');

contract('UBCoin - BasicToken test', function (accounts) {
  basic(token, accounts);
});
contract('UBCoin - StandardToken test', function (accounts) {
  standard(token, accounts);
});
contract('UBCoin - Mintable test', function (accounts) {
  mintable(token, accounts);
});
contract('UBCoin - Ownable test', function (accounts) {
  ownable(token, accounts);
});
contract('UBCoin - Additional conditions test', function (accounts) {
  additional(token, accounts);
});

