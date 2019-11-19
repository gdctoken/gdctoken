require('dotenv').config();
const RankingBallGoldClone = artifacts.require("./RankingBallGoldClone.sol");
const parentToken = process.env.PARENT;
const snapshotBlock = process.env.SNAPSHOT;
const multiplyParent = process.env.MULTIPLY;

// set multiply number above 1
if (multiplyParent < 1) {
   multiplyParent = 1
}

module.exports = async function (deployer) {
  deployer.deploy(RankingBallGoldClone, "0x0000000000000000000000000000000000000000", parentToken, snapshotBlock, multiplyParent);
};
