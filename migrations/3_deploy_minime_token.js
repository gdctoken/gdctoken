require('dotenv').config();
const RankingBallGoldToken = artifacts.require("./RankingBallGoldToken.sol");

module.exports = async function (deployer) {
  deployer.deploy(RankingBallGoldToken, "0x0000000000000000000000000000000000000000");
};
