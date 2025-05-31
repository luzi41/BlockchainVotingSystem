const hre = require("hardhat");
const ethers = hre.ethers;

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with:", deployer.address);

  // Deploy ElectionRegistry
  const Registry = await ethers.getContractFactory("ElectionRegistry");
  const registry = await Registry.deploy();
  await registry.deployed();
  console.log("ElectionRegistry deployed at:", registry.address);

  // Deploy VoteLedger with address of registry
  const Ledger = await ethers.getContractFactory("VoteLedger");
  const ledger = await Ledger.deploy(registry.address);
  await ledger.deployed();
  console.log("VoteLedger deployed at:", ledger.address);

  // Deploy Tally
  const Tally = await ethers.getContractFactory("Tally");
  const tally = await Tally.deploy();
  await tally.deployed();
  console.log("Tally deployed at:", tally.address);

  // --- Interaktion: Registrierung eines Token-Hashes ---
  const sampleToken = "abc123SECRET";
  const tokenHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(sampleToken));
  const tx1 = await registry.registerToken(tokenHash);
  await tx1.wait();
  console.log("Token registered with hash:", tokenHash);

  // --- Interaktion: Stimmabgabe ---
  const encryptedVote = "Verschlüsselte Stimme base64==";
  const tx2 = await ledger.submitVote(tokenHash, encryptedVote);
  await tx2.wait();
  console.log("Vote submitted.");

  // --- Interaktion: Ergebnis veröffentlichen ---
  const resultJson = JSON.stringify({
    "Partei A": 1000,
    "Partei B": 1200,
    "Partei C": 800,
  });

  const tx3 = await tally.submitResults(resultJson);
  await tx3.wait();
  console.log("Ergebnisse eingereicht.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
