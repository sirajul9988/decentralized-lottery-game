// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Lottery {
    address public manager;
    address[] public players;
    
    event WinnerPicked(address indexed winner, uint256 amount);

    constructor() {
        manager = msg.sender;
    }

    function enter() public payable {
        require(msg.value > .01 ether, "Minimum 0.01 ETH to enter");
        players.push(msg.sender);
    }

    function random() private view returns (uint) {
        // Pseudo-random mechanism (Not for production with high stakes)
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, players)));
    }

    function pickWinner() public restricted {
        require(players.length > 0, "No players in lottery");
        
        uint index = random() % players.length;
        address winner = players[index];
        uint256 prize = address(this).balance;
        
        // Transfer prize to winner
        payable(winner).transfer(prize);
        
        emit WinnerPicked(winner, prize);
        
        // Reset the state for the next round
        players = new address[](0);
    }

    modifier restricted() {
        require(msg.sender == manager, "Only manager can call this");
        _;
    }

    function getPlayers() public view returns (address[] memory) {
        return players;
    }
}
