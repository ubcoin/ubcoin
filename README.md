![UBCoin](logo.png "UBCoin")

# UBCoin smart contract

* _Standard_        : [ERC20](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md)
* _[Name](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md#name)_            : UBCoin 
* _[Ticker](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md#symbol)_          : UBC
* _[Decimals](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md#decimals)_        : 18
* _Emission_        : Mintable
* _Crowdsales_      : 2
* _Fiat dependency_ : No
* _Tokens locked_   : Yes

## Smart-contracts description

The tokens for the bounty and the team are minted after the ICO  is finished.  
There is a special function to return 3rd party tokens that were sent by mistake (function retrieveTokens()).  
Each stage has a direct minting function in wei. This is made to support the external payment gateways.

### Contracts contains
1. _UBCoin_ - Token contract
2. _PreICO_ - PreICO contract
3. _ICO_ - ICO contract
4. _Configurator_ - contract with main configuration for production
5. _TeamWallet_ - wallet for freeze team tokens

### How to manage contract
To start working with contract you should follow next steps:
1. Compile it in Remix with enamble optimization flag and compiler 0.4.18
2. Deploy bytecode with MyEtherWallet. Gas 5100000 (actually 5073514).
3. Call 'deploy' function on addres from (3). Gas 4000000 (actually 3979551). 

Contract manager must call _finish_ after each crowdsale in corresponding contract!
To support external mint service manager should specify address by calling _setDirectMintAgent_. After that specified address can direct mint tokens by calling _mintTokensByETHExternal_ and _mintTokensExternal_.

### How to invest
To purchase tokens investor should send ETH (more than minimum 0.1 ETH) to corresponding crowdsale contract.
Recommended GAS: 250000, GAS PRICE - 21 Gwei.

### Wallets with ERC20 support
1. MyEtherWallet - https://www.myetherwallet.com/
2. Parity 
3. Mist/Ethereum wallet

EXODUS not support ERC20, but have way to export key into MyEtherWallet - http://support.exodus.io/article/128-how-do-i-receive-unsupported-erc20-tokens

Investor must not use other wallets, coinmarkets or stocks. Can lose money.

## Tokens distribution

* _Bounty tokens percent_       : 4%
* _Team tokens percent_         : 12%
* _Reserved tokens_             : 34%
* _For sale tokens percent_     : 50%

## Main network configuration

* _Bounty tokens wallet_        : 0xdAA156b6eA6b9737eA20c68Db4040B1182E487B6
* _Reserved tokens wallet_      : 0xE1D1898660469797B22D348Ff67d54643d848295
* _Team tokens lock period_     : 180 days lock, after every 90 days vesting 25%
* _Contracts owner_             : 0xF1f94bAD54C8827C3B53754ad7dAa0FF5DCD527d

### Links
1. _Token_ - https://etherscan.io/token/0x2d3e7d4870a51b918919e7b851fe19983e4c38d5
2. _PreICO_ - https://etherscan.io/address/0x9ae773191a0b152955be05abacc9925f0007aac6
3. _ICO_ - https://etherscan.io/address/0xdb58279c60c7641dabb015665db32372d031e55f
3. _TeamWallet_ - https://etherscan.io/address/0xe564e0a6a545671d29ad690398c9e94a398434b3

### Crowdsale stages

#### PreICO
* _Minimal insvested limit_     : 50 ETH
* _Base price_                  : 1 ETH = 18 667 Tokens
* _Hardcap_                     : 21 500 ETH
* _Period_                      : 22 days
* _Start_                       : 10 Mar 2018 00:00:00 GMT
* _Wallet_                      : 0x00EE9d057f66754C7D92550F77Aeb0A87AE34B01

##### Features
Whitelist

#### ICO
* _Minimal insvested limit_     : 0.1 ETH
* _Techincally base price_      : 1 ETH = 8000 Tokens
* _Hardcap_                     : 157 500 ETH
* _Start_                       : 02 Apr 2018 00:00:00 GMT
* _Wallet_                      : 0x5FB78D8B8f1161731BC80eF93CBcfccc5783356F
 
##### Milestones
1. 20 days, 1 ETH = 11 200 Tokens (Technically +40%)
2. 20 days, 1 ETH =  9 280 Tokens (Technically +16%)
3. 20 days, 1 ETH =  8 000 Tokens 

## Ropsten network configuration 

### links
1. _Token_ - https://ropsten.etherscan.io/address/0xac29edd683847c4d208008d1ad2797f79feac963
2. _PreICO_ - https://ropsten.etherscan.io/address/0x29e998e17f29d96b36a5f1de2c16ad2ca40c3e7e
3. _ICO_ - https://ropsten.etherscan.io/address/0x5958e5dc8a4ea282ac40bb6105febc605615f960
4. _TeamWallet_ - https://ropsten.etherscan.io/address/0xd7de556303de15e271ca476ee4a2289086051496

### Crowdsale stages

#### PreICO

* _Price_                       : 1 ETH = 33 334 Tokens
* _Minimal investment limit_    : 0.1 ETH
* _Hardcap_                     : 3 ETH
* _Period_                      : 15 days
* _Start_                       : 01 Mar 2018 00:00:00 GMT
* _Wallet_                      : 0x8fd94be56237ea9d854b23b78615775121dd1e82

##### Purchasers

* 1 ETH =>   33,334 tokens, gas = 115181
https://ropsten.etherscan.io/tx/0x9febc6bfac319fce80ce78cccaae553020b68487d3eb7474152d2b5276011c3e

* 1 ETH => rejected txn, purchaser is not in white list, gas = 22474
https://ropsten.etherscan.io/tx/0x44e05e24785021037faa250caccff1795cd2bbb9ab930936cf2c883912d3a2d9

##### Service operations

* addToWhiteList, gas = 44009
https://ropsten.etherscan.io/tx/0xc9d092803d1c8872489b697df94f04999d481277d20c5c170cb8b0600ac9b8df

* finish, gas = 30307
https://ropsten.etherscan.io/tx/0x1fc599f467ade4ed486b8b51fd0f26dd2227f057180a775b54e06603be3b4ef5

#### ICO

* _Price_                       : 1 ETH = 14 286 Tokens
* _Minimal investment limit_    : 0.1 ETH
* _Hardcap_                     : 96 000 ETH
* _Wallet_                      : 0x8fd94be56237ea9d854b23b78615775121dd1e82
* _Start_                       : 01 Mar 2018 00:00:00 GMT
* _Bounty tokens percent_       : 4%
* _Team tokens percent_         : 12%
* _Reserved tokens_             : 34%
* _Bounty tokens wallet_        : 0x470a2D1105EaE6aAe879623357F615Ab9cbf906E
* _Reserved tokens wallet_      : 0x093A89bDb5CE905fecb6272ff3ac92f53350a79A

_Milestones_

1. 20 days, 1 ETH = 20 000 Tokens (Technically +40%)
2. 20 days, 1 ETH = 17 143 Tokens (Technically +20%)
3. 20 days, 1 ETH = 14 286 Tokens 

##### Purchasers
  
* 1 ETH =>  20,000.4 tokens (40% bonus), gas = 101088
https://ropsten.etherscan.io/tx/0x65c1e6f84e14d8d1e9124cc112a7edeb167452daec4273ac6dcbad8c1bb97ffa

##### Service operations

* finish, gas = 232631
https://ropsten.etherscan.io/tx/0x243342124f04e822369752f759ab48662914e5089473da74ab5251ae9e865b05

##### Token holders
https://ropsten.etherscan.io/token/0xac29edd683847c4d208008d1ad2797f79feac963#balances
