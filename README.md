![UBCoin](logo.png "UBCoin")

# UBCoin smart contract

* _Standart_        : ERC20
* _Name_            : UBCoin
* _Ticket_          : UBC
* _Decimals_        : 18
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
3. _Mainsale_ - ICO contract
4. _Configurator_ - contract with main configuration for production
4. _TeamWallet_ - wallet for freeze team tokens

### How to manage contract
To start working with contract you should follow next steps:
1. Compile it in Remix with enamble optimization flag and compiler 0.4.18
2. Deploy bytecode with MyEtherWallet. Gas 5100000 (actually 5073514).
3. Call 'deploy' function on addres from (3). Gas 4000000 (actually 3979551). 

Contract manager must call finishMinting after each crowdsale milestone!
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

* _Minimal insvested limit_     : 0.1 ETH
* _Bounty tokens wallet_        : 
* _Reserved tokens wallet_      :
* _Team tokens lock period_     : 180 days lock, after every 90 days vesting 25%
* _Contracts owner_             :

### Links
1. _Token_ -
2. _PreICO_ -
3. _ICO_ -
3. _TeamWallet_ -

### Crowdsale stages

#### PreICO
* _Base price_                  : 1 ETH = 33 334 Tokens
* _Hardcap_                     : 8500 ETH
* _Period_                      : 15 days
* _Start_                       : 
* _Wallet_                      : 

##### Features
Whitelist

#### ICO
* _Hardcap_                     : 96 000 ETH
* _Start_                       : 
* _Wallet_                      : 
* _Techincally base price_      : 1 ETH = 14 286 Tokens
 
##### Milestones
1. 20 days, 1 ETH = 20 000 Tokens (Technically +40%)
2. 20 days, 1 ETH = 16 667 Tokens (Technically +20%)
3. 20 days, 1 ETH = 14 286 Tokens 

