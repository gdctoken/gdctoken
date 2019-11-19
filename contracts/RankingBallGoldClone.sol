pragma solidity^0.4.18;

import "./MiniMeMultiplyToken.sol";

contract RankingBallGoldClone is MiniMeMultiplyToken {
    function RankingBallGoldClone(address _tokenFactory, address parent, uint snapshot, uint8 multiply)
      MiniMeMultiplyToken(
        _tokenFactory,
        parent,                     // no parent token
        snapshot,                   // no snapshot block number from parent
        "Global Digital Content",  // Token name
        18,                      // Decimals
        multiply,                // Multiply Number of parent Balance
        "GDC",                   // Symbol
        true                     // Enable transfers
      ) {}
}
