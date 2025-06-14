const express = require("express");
const fs = require("fs");
const forge = require("node-forge");
const privateKeyPem = fs.readFileSync("../keys/private.pem", "utf8");
const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);
const { ethers } = require("ethers");
const app = express();
const prompt = require('prompt');

prompt.start();

prompt.get(['PathToQuorum'], function (err, result) {
    if (err) { return onErr(err); }
    console.log('Command-line input received:');
    console.log('  PathToQuorum: ' + result.PathToQuorum);


    app.use(express.json());

    const keystore = fs.readFileSync(result.PathToQuorum + "/config/nodes/member1/accountKeystore", "utf8");
    const password = fs.readFileSync(result.PathToQuorum + "/config/nodes/member1/accountPassword", "utf8").trim();
    const contractAddress = fs.readFileSync("deployment-address.txt", "utf8").trim();
    const abi = require("./Election.json").abi;

    async function loadContract() {
      const provider = new ethers.JsonRpcProvider("http://localhost:8545");
      const wallet = await ethers.Wallet.fromEncryptedJson(keystore, password);
      const signer = wallet.connect(provider);
      return new ethers.Contract(contractAddress, abi, signer);
    }

    app.post("/vote", async (req, res) => {
        const { encryptedVote, token } = req.body;
        try {
            const tx = await election.castEncryptedVote(encryptedVote, token);
            await tx.wait();
            res.json({ success: true });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });


    app.post("/registerCandidate", async (req, res) => {
      const { name, wahlbezirk, partei } = req.body;
      try {
        const contract = await loadContract();
        const tx = await contract.registerCandidate(name, wahlbezirk, partei);
        await tx.wait();
        res.send({ status: "success", tx: tx.hash });     
      } catch (err) {
        res.status(500).send({ error: err.message });
      }
    });

    app.post("/startVoting", async (req, res) => {
      const { title } = req.body;
      try {
        const contract = await loadContract();
        const tx = await contract.startVoting(title);
        console.log(req.body);
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

    app.post("/storeAggregatedVotes", async (req, res) => {
      const { aggregatedVotes } = req.body;
      try {
      const tx = await contract.storeAggegatedVotes(aggregatedVotes);
      await tx.wait();
        res.send({ status: "success", tx: tx.hash });
      } catch (err) {
        res.status(500).send({ error: err.message });
      }  
    });

    app.listen(3001, () => console.log("API läuft auf Port 3001!"));
});    
