![UBCoin](logo.png "UBCoin")

# Vestarin smart contract

* _Standart_        : ERC20
* _Name_            : UBCoin
* _Ticket_          : VST
* _Decimals_        : 18
* _Emission_        : Mintable
* _Crowdsales_      : 2
* _Fiat dependency_ : No
* _Tokens locked_   : Yes

## Smart-contracts description

Contract mint bounty and founders tokens after main sale stage finished. 
Crowdsale contracts have special function to retrieve transferred in errors tokens.
Also crowdsale contracts have special function to direct mint tokens in wei value (featue implemneted to support external pay gateway).

### Contracts contains
1. _UBCoinToken_ - Token contract
2. _Presale_ - Presale contract
3. _Mainsale_ - ICO contract
4. _Configurator_ - contract with main configuration for production

### How to manage contract
To start working with contract you should follow next steps:
1. Compile it in Remix with enamble optimization flag and compiler 0.4.18
2. Deploy bytecode with MyEtherWallet. Gas 5100000 (actually 5073514).
3. Call 'deploy' function on addres from (3). Gas 4000000 (actually 3979551). 

Contract manager must call finishMinting after each crowdsale milestone!
To support external mint service manager should specify address by calling _setDirectMintAgent_. After that specified address can direct mint UBC tokens by calling _directMint_.

### How to invest
To purchase tokens investor should send ETH (more than minimum 0.1 ETH) to corresponding crowdsale contract.
Recommended GAS: 250000, GAS PRICE - 21 Gwei.

### Wallets with ERC20 support
1. MyEtherWallet - https://www.myetherwallet.com/
2. Parity 
3. Mist/Ethereum wallet

EXODUS not support ERC20, but have way to export key into MyEtherWallet - http://support.exodus.io/article/128-how-do-i-receive-unsupported-erc20-tokens

Investor must not use other wallets, coinmarkets or stocks. Can lose money.

## Token counts

Maximum tokens can mint - 20 000 000 VST 
* on all crowdsales : 82% or 16 500 000 VST 
* on presale : 7% or 1 500 000 VST 
* on mainsale : 75% or 15 000 000 VST
* to founders : 13% or 2 500 000 VST
* to bounty : 5% or 1 000 000 VST

## Main network configuration

* _Minimal insvested limit_     : 0.1 ETH
* _Base price_                  : 18 800 UBC per ETH
* _Bounty tokens percent_       : 7% 
* _Founders tokens percent_     : 12% 
* _Reserved tokens_             : 31% 
* _For sale tokens percent_     : 50%
* _Founders tokens wallet_      : 
* _Bounty tokens wallet_        : 
* _Reserved tokens wallet_      : 
* _Founders tokens lock period_ : 90 days

### Features
whitelist on presale
time-deps bonus system
1000$ ~ per 1 ETH
base price 5 cent

### Links
1. _Token_ - 
2. _Presale_ - 
3. _Mainsale_ - 

### Crowdsale stages

#### Presale
* _Hardcap_                    : 8500 ETH
* _Period_                     : 20 days
* _Start_                      : 
* _Wallet_                     :
* _Contract owner_             : 

#### ICO
* _Hardcap_                    : 95 800 ETH
* _Start_                      : 
* _Wallet_                     : 
* _Contract owner_             : 

_Milestones_
1. 20 days, +% tokens bonus 
2. 20 days, +% tokens bonus
3. 20 days, without bonus 


