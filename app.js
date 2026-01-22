const contractAddress = "0xYOUR_LOTTERY_ADDRESS";
const abi = [
    "function enter() public payable",
    "function pickWinner() public",
    "function getPlayers() public view returns (address[])",
    "function manager() public view returns (address)",
    "event WinnerPicked(address indexed winner, uint256 amount)"
];

let provider, signer, contract;

async function init() {
    if (window.ethereum) {
        provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        signer = provider.getSigner();
        contract = new ethers.Contract(contractAddress, abi, signer);

        updateUI();
        checkManager();
    }
}

async function updateUI() {
    const players = await contract.getPlayers();
    const balance = await provider.getBalance(contractAddress);
    
    document.getElementById('playerCount').innerText = players.length;
    document.getElementById('pool').innerText = ethers.utils.formatEther(balance);
}

async function checkManager() {
    const manager = await contract.manager();
    const user = await signer.getAddress();
    if (manager.toLowerCase() === user.toLowerCase()) {
        document.getElementById('managerSection').style.display = "block";
    }
}

document.getElementById('enterBtn').addEventListener('click', async () => {
    const amt = document.getElementById('amount').value;
    const tx = await contract.enter({ value: ethers.utils.parseEther(amt) });
    document.getElementById('status').innerText = "Entering...";
    await tx.wait();
    updateUI();
    document.getElementById('status').innerText = "Entered!";
});

document.getElementById('pickBtn').addEventListener('click', async () => {
    const tx = await contract.pickWinner();
    document.getElementById('status').innerText = "Picking winner...";
    await tx.wait();
    updateUI();
    document.getElementById('status').innerText = "Winner Picked & Paid!";
});

init();
