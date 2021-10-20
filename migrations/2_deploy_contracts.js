const DappToken = artifacts.require('DappToken')
const DaiToken = artifacts.require('DaiToken')
const TokenVault = artifacts.require('TokenVault')

module.exports = async function(deployer, accounts, network) {
  // Deploy the Mock DAI Token
  await deployer.deploy(DaiToken)
  const daiToken = await DaiToken.deployed()

  // Deploy the Dapp Token
  await deployer.deploy(DappToken)
  const dappToken = await DappToken.deployed()

  // Deploy the Token Vault
  await deployer.deploy(TokenVault, dappToken.address, daiToken.address)
  const tokenVault = await TokenVault.deployed()

  // Transfer all tokens to TokenVault (1Million)
  await dappToken.transfer(tokenVault.address, '1000000000000000000000000')

  // Transfer 100 Mock DAI Tokens each to 2 investors 
  await daiToken.transfer(accounts[1], '1000000000000000000000')
  await daiToken.transfer(accounts[2], '1000000000000000000000')
};