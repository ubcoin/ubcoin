import additional from './token/additional';
import basic from './token/basic';
import mintable from './token/mintable';
import ownable from './token/ownable';
import standard from './token/standard';

const token = artifacts.require('UBCoinToken.sol');

contract('StasyqToken - BasicToken test', function (accounts) {
  basic(token, accounts);
});
contract('StasyqToken - StandardToken test', function (accounts) {
  standard(token, accounts);
});
contract('StasyqToken - Mintable test', function (accounts) {
  mintable(token, accounts);
});
contract('StasyqToken - Ownable test', function (accounts) {
  ownable(token, accounts);
});
contract('StasyqToken - Additional conditions test', function (accounts) {
  additional(token, accounts);
});

