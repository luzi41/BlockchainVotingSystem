const express = require("express");
const { ethers } = require("ethers");
const fs = require("fs");
const app = express();
app.use(express.json());

const keystore = fs.readFileSync("quorum-test-network/config/nodes/member1/accountKeystore", "utf8");
const password = fs.readFileSync("quorum-test-network/config/nodes/member1/accountPassword", "utf8").trim();
const contractAddress = fs.readFileSync("deployment-address.txt", "utf8").trim(); // Adresse speichern nach Deployment
const abi = require("./Election.json").abi;

async function loadContract() {
  const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
  const wallet = await ethers.Wallet.fromEncryptedJson(keystore, password);
  const signer = wallet.connect(provider);
  return new ethers.Contract(contractAddress, abi, signer);
}

app.post("/register", async (req, res) => {
  const { voterAddress } = req.body;
  try {
    const contract = await loadContract();
    const tx = await contract.registerVoter(voterAddress);
    await tx.wait();
    res.send({ status: "success", tx: tx.hash });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

app.listen(3001, () => console.log("🔌 API läuft auf Port 3001"));
