pragma solidity^0.4.18;

import "./base/crowdsale/BaseCrowdsale.sol";
import "./base/crowdsale/MiniMeBaseCrowdsale.sol";
import "./base/crowdsale/BonusCrowdsale.sol";
import "./base/crowdsale/BlockIntervalCrowdsale.sol";
import "./base/crowdsale/KYCCrowdsale.sol";
import "./base/crowdsale/StagedCrowdsale.sol";

contract RankingBallGoldCrowdsale is BaseCrowdsale, MiniMeBaseCrowdsale, BonusCrowdsale, BlockIntervalCrowdsale, KYCCrowdsale, StagedCrowdsale {

  bool public initialized;

  // constructor parameters are left padded bytes32.

  function RankingBallGoldCrowdsale(bytes32[4] args) 
    BaseCrowdsale()
    MiniMeBaseCrowdsale(
      parseAddress(args[0]))
    BonusCrowdsale()
    BlockIntervalCrowdsale(
      parseUint(args[1]))
    KYCCrowdsale(
      parseAddress(args[2]))
    StagedCrowdsale(
      parseUint(args[3])) public {}
  

  function parseBool(bytes32 b) internal pure returns (bool) {
    return b == 0x1;
  }

  function parseUint(bytes32 b) internal pure returns (uint) {
    return uint(b);
  }

  function parseAddress(bytes32 b) internal pure returns (address) {
    return address(b & 0x000000000000000000000000ffffffffffffffffffffffffffffffffffffffff);
  }

  function generateTokens(uint256 _targetTotalSupply) internal {

      generateTokens(0x173dF4D12d75c876656196C095f59b20aBCFa34a, _targetTotalSupply, 833);

      generateTokens(0x73A5dAA05d62e6F60C5cD8d334DfDF9E59C3b14D, _targetTotalSupply, 833);

      generateTokens(0xc135e061DF4AF2583B2CA2D41E37598856DB62D8, _targetTotalSupply, 834);

      generateTokens(0xA3C9419b03d1Cb893eD0f2ae772d927f5Bca05A2, _targetTotalSupply, 1000);

      generateTokens(0x8c15c8709764b279968B647E580bbC3E370BfA87, _targetTotalSupply, 1000);

      generateTokens(0x2c08a528433570781A953Db7CCDed3a798C0DA9E, _targetTotalSupply, 1000);

      generateTokens(0x40A15bc3036293dCE89715ac7bB3090E0160e6ba, _targetTotalSupply, 1000);
  }

  function init(bytes32[] args) public {
    uint _startTime = uint(args[0]);
    uint _endTime = uint(args[1]);
    uint _rate = uint(args[2]);
    uint _coeff = uint(args[3]);
    uint _cap = uint(args[4]);
    uint _goal = uint(args[5]);
    uint _lockerRatio = uint(args[6]);
    uint _crowdsaleRatio = uint(args[7]);
    address _vault = address(args[8]);
    address _locker = address(args[9]);
    address _nextTokenOwner = address(args[10]);

    require(_startTime >= now);
    require(_endTime >= _startTime);
    require(_rate > 0);
    require(_coeff > 0);
    require(_cap > 0);
    require(_goal > 0);
    require(_lockerRatio > 0);
    require(_crowdsaleRatio > 0);
    require(_vault != address(0));
    require(_locker != address(0));
    require(_nextTokenOwner != address(0));
    
    startTime = _startTime;
    endTime = _endTime;
    rate = _rate;
    coeff = _coeff;
    cap = _cap;
    goal = _goal;
    lockerRatio = _lockerRatio;
    crowdsaleRatio = _crowdsaleRatio;
    vault = MultiHolderVault(_vault);
    locker = Locker(_locker);
    nextTokenOwner = _nextTokenOwner;
  }
}




