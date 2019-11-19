const { BN, ether } = require('@openzeppelin/test-helpers')
const eth = web3.eth;

const should = require("chai")
  .use(require("chai-as-promised"))
  .should();

const Token = artifacts.require("./RankingBallGoldToken.sol");
const CloneToken = artifacts.require("./RankingBallGoldClone.sol");
const NullAddr = "0x0000000000000000000000000000000000000000"

const verbose = false;
const log = (S) => {
  if (verbose) {
    console.log(S);
  }
};

contract("Token", async ([ owner ]) => {
  // tx params
  let parentToken, targetBlock, accounts;

  // test parameteres
  before(async () => {
    accounts = await web3.eth.getAccounts();

    // deploy parent Token contracts
    parentToken = await Token.new(NullAddr)
    log("   parent Token address : " + parentToken.address)

    // generate tokens to accounts
    for (var i=1; i < accounts.length; i++) {
      await parentToken.generateTokens(accounts[i], new ether(i.toString()));
    }

    targetBlock = await web3.eth.getBlockNumber();
    log("   target snapshot block : " + targetBlock)

  });

  it("Check Parent token deployer balance", async () => {
    (await parentToken.balanceOf(accounts[0]))
      .should.be.bignumber.equal(new BN(0));
  });

  it("Check parent token account balance", async () => {
    (await parentToken.balanceOf(accounts[1]))
      .should.be.bignumber.equal(ether('1'));
  });

  describe("Clone Token at targetBlock", async () => {
    const multiply = 2;
    let cloneToken2

    it("Check Parent Token address", async () => {
      cloneToken2 = await CloneToken.new(NullAddr, parentToken.address, targetBlock, multiply);
      (await cloneToken2.parentToken())
        .should.equal(parentToken.address);
    });

    it("Clone Token balance check at targetBlock", async () => {
      for (var i=1; i < accounts.length; i++) {
        var parentBalance = await parentToken.balanceOf(accounts[i]);
        var targetBalance = parentBalance.mul(new BN(multiply.toString()));

        (await cloneToken2.balanceOf(accounts[i]))
          .should.be.bignumber.equal(targetBalance);
      }
    });
  });

  describe("Clone Token at (targetBlock - 1)", async () => {
    const multiply = 3;
    let cloneToken3

    it("Check Parent Token address at targetBlock -1", async () => {
      cloneToken3 = await CloneToken.new(NullAddr, parentToken.address, targetBlock-1, multiply);
      (await cloneToken3.parentToken())
        .should.equal(parentToken.address);
      log(cloneToken3.address)
    });

    it("Clone Token balance check at targetBlock -1", async () => {
      for (var i=1; i < (accounts.length-1); i++) {
        var parentBalance = await parentToken.balanceOf(accounts[i]);
        var targetBalance = parentBalance.mul(new BN(multiply.toString()));

        (await cloneToken3.balanceOf(accounts[i]))
          .should.be.bignumber.equal(targetBalance);

        log(accounts[i])
        log(parentBalance)
        log(targetBalance)
      }
    });

    it("Check Last account balance is 0", async () => {
      const lastIndex = accounts.length - 1
      var lastAccount = accounts[lastIndex];
      (await cloneToken3.balanceOf(lastAccount))
        .should.be.bignumber.equal(new BN(0));
    });
  });

  describe("Clone Token at (targetBlock + 1)", async () => {
    const multiply = 1;
    let cloneToken4

    it("Check Parent Token address at targetBlock +1", async () => {
      cloneToken4 = await CloneToken.new(NullAddr, parentToken.address, targetBlock+1, multiply);
      (await cloneToken4.parentToken())
        .should.equal(parentToken.address);
      log(cloneToken4.address)
    });

    it("Check CloneToken balance at targetBlock +1", async () => {
      for (var i=1; i < accounts.length; i++) {
        var parentBalance = await parentToken.balanceOf(accounts[i]);

        (await cloneToken4.balanceOf(accounts[i]))
          .should.be.bignumber.equal(parentBalance);

        log(accounts[i])
        log(parentBalance)
      }
    });
  });

});
