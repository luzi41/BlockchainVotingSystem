//V 0.22.10

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
    const abi = require("./Proposals.json").abi;

    async function loadContract() {
      const provider = new ethers.JsonRpcProvider("http://localhost:8545");
      const wallet = await ethers.Wallet.fromEncryptedJson(keystore, password);
      const signer = wallet.connect(provider);
      return new ethers.Contract(contractAddress, abi, signer);
    }
    
    function decryptBytes(_bytes) {
      const encryptedBytes = Buffer.from(_bytes, "base64");
      const decrypted = privateKey.decrypt(encryptedBytes.toString("binary"), "RSA-OAEP");
      return decrypted;
    }

    function decryptStringVote(_vote) {
      const decrypted = decryptBytes(_vote); // <- das auch in die Hilfsfunktion?
      console.log("Stimme = " + decrypted) // <- das auch in die Hilfsfunktion?
      return decrypted; // <- das auch in die Hilfsfunktion? (return)      
    }

    function tally(_decryptedVotes) {
      const tally = {};        
      for (const name of _decryptedVotes) {
        tally[name] = (tally[name] || 0) + 1;
      }
      return JSON.stringify(tally);
    }

    function signature(_tally) {
      const md1 = forge.md.sha1.create();
      md1.update(_tally, 'utf8');
      const signature = forge.util.encode64(privateKey.sign(md1));
      return signature;
    }

    app.post("/registerProposal", async (req, res) => {
      const { name, text, url, qtype, answer1, answer2 } = req.body;
      try {
        console.log("Arg Text: ", text );
        const contract = await loadContract();
        const tx = await contract.registerProposal(name, text, url, qtype, answer1, answer2);
        await tx.wait();
        res.send({ status: "success", tx: tx.hash });     
      } catch (err) {
        res.status(500).send({ error: err.message });
      }
    });

    app.post("/storePublicKey", async (req, res) => {
      const { publicKey } = req.body;
      try {
        const contract = await loadContract();
        const tx = await contract.storePublicKey(publicKey);
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
      const { token, electionDistrict } = req.body;

      try {
        const contract = await loadContract();
        const tx = await contract.registerToken(token, electionDistrict);
        await tx.wait();
        res.send({ status: "success", tx: tx.hash });
      } catch (err) {
        res.status(500).send({ error: err.message });
      }
    });

    app.post("/storeProposalResult", async (req, res) => {
      try {
        const contract = await loadContract();
        const encryptedVotes = await contract.getEncryptedVotes();
        console.log("Anzahl Stimmen: " + encryptedVotes.length);
        const decryptedVotes = []; 
        
        for (let i = 0; i < encryptedVotes.length; i++) {         
          const encryptedVote = encryptedVotes[i];
          decryptedVotes[i] = decryptStringVote(encryptedVote.vote);
        }

        const tally = tally(decryptedVotes);
        const signature = signature(tally);
        const tx = await contract.storeElectionResult1(tally, signature);
        await tx.wait() 
        console.log("✅ Stimmen gespeichert und Transaktion gesendet:", tx.hash);
        res.send({ status: "success" });     
      } catch (err) {
        res.status(500).send({ error: err.message });
      }
    });
    app.listen(3001, () => console.log("API läuft auf Port 3001!"));
});