pragma solidity^0.4.18;

import "./base/minime/MiniMeToken.sol";
  
contract RankingBallGoldToken is MiniMeToken { 
    function RankingBallGoldToken(address _tokenFactory)
      MiniMeToken(
        _tokenFactory,
        0x0,                     // no parent token
        0,                       // no snapshot block number from parent
        "RankingBall Gold",  // Token name
        18,                      // Decimals
        "RBG",                   // Symbol
        true                     // Enable transfers
      ) {} 
}








