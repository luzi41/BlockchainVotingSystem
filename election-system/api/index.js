const express = require("express");
const fs = require("fs");
const { ethers } = require("ethers");
const app = express();
app.use(express.json());

const keystore = fs.readFileSync("../quorum-test-network/config/nodes/member1/accountKeystore", "utf8");
const password = fs.readFileSync("../quorum-test-network/config/nodes/member1/accountPassword", "utf8").trim();
const contractAddress = fs.readFileSync("deployment-address.txt", "utf8").trim();
const abi = require("./Election.json").abi;

async function loadContract() {
  const provider = new ethers.JsonRpcProvider("http://localhost:8545");
  const wallet = await ethers.Wallet.fromEncryptedJson(keystore, password);
  const signer = wallet.connect(provider);
  return new ethers.Contract(contractAddress, abi, signer);
}

/*
app.post("/registerVoter", async (req, res) => {
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
*/

app.post("/registerCandidate", async (req, res) => {
  const { name } = req.body;
  try {
    const contract = await loadContract();
    const tx = await contract.registerCandidate(name);
    await tx.wait();
    res.send({ status: "success", tx: tx.hash });
    
    const count = await electionContract.getCandidateCount();
    for (let i = 0; i < count; i++) {
        const candidate = await electionContract.getCandidate(i);
    console.log(candidate.name, candidate.voteCount.toString());
}      
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

app.post("/startVoting", async (req, res) => {
  try {
    const contract = await loadContract();
    const tx = await contract.startVoting();
    await tx.wait();
    res.send({ status: "success", tx: tx.hash });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

app.post("/endVoting", async (req, res) => {
  try {
    const contract = await loadContract();
    const tx = await contract.endVoting();
    await tx.wait();
    res.send({ status: "success", tx: tx.hash });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

app.post("/registerToken", async (req, res) => {
  const { token } = req.body;

  try {
    const contract = await loadContract();
    const tx = await contract.registerToken(token);
    await tx.wait();
    res.send({ status: "success", tx: tx.hash });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

app.listen(3001, () => console.log("API läuft auf Port 3001!"));