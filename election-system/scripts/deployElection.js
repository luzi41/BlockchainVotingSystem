const fs = require("fs");
const hre = require("hardhat");

async function main() {
  // Admin-Wallet laden
  const keystore = fs.readFileSync("quorum-test-network/config/nodes/member1/accountKeystore", "utf8");
  const password = fs.readFileSync("quorum-test-network/config/nodes/member1/accountPassword", "utf8").trim();
  const wallet = await hre.ethers.Wallet.fromEncryptedJson(keystore, password);

  // Verbindung zum Quorum-Netzwerk
  const provider = new hre.ethers.JsonRpcProvider("http://localhost:8545");
  const admin = wallet.connect(provider);

  // Contract factory und Deployment
  const Election = await hre.ethers.getContractFactory("Election", admin);
  const election = await Election.deploy();
  //await election.deployed();
  console.log(election.target);
  
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
