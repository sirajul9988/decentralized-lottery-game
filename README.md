# Decentralized Lottery Game

A fair, transparent, and unstoppable lottery game built on Ethereum. Unlike traditional lotteries, the code is open-source, and the prize pool is held in a smart contract rather than a centralized bank account.

## How it Works
1. **Enter:** Users pay a fixed entry fee (e.g., 0.1 ETH) to join the pool.
2. **Pool:** All ETH is stored securely in the contract.
3. **Pick Winner:** The manager calls `pickWinner()`.
4. **Payout:** The contract pseudo-randomly selects an address and sends the entire balance to the winner.
5. **Reset:** The players array is cleared for the next round.

## Disclaimer on Randomness
This repo uses `keccak256` with block difficulty and timestamps for random number generation. While sufficient for educational purposes and hackathons, production apps should use Chainlink VRF to prevent miners from manipulating the outcome.

## Quick Start
1. `npm install`
2. `npx hardhat run deploy.js --network goerli`
3. Update `app.js` with your contract address.
4. Open `index.html`.

## Tech Stack
- Solidity ^0.8.17
- Ethers.js
- HTML/CSS
