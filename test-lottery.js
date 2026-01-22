const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Lottery", function () {
  it("Should allow entrance and pick a winner", async function () {
    const [manager, player1, player2] = await ethers.getSigners();
    const Lottery = await ethers.getContractFactory("Lottery");
    const lottery = await Lottery.deploy();

    await lottery.connect(player1).enter({ value: ethers.utils.parseEther("1.0") });
    await lottery.connect(player2).enter({ value: ethers.utils.parseEther("1.0") });

    const players = await lottery.getPlayers();
    expect(players.length).to.equal(2);

    const initialBalance = await player1.getBalance();
    await lottery.connect(manager).pickWinner();
    
    // Check that lottery is reset
    const newPlayers = await lottery.getPlayers();
    expect(newPlayers.length).to.equal(0);
  });
});
