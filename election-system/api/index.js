//V 0.18.9

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
    const abi = require("./Bundestagswahl.json").abi;

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

    app.post("/registerElectionDistrict", async (req, res) => {
      const {name, nummer, publicKey} = req.body;
      try {
        const contract = await loadContract();
        const tx = await contract.registerElectionDistrict(name, nummer, publicKey);
        await tx.wait();
        res.send({status: "success", tx: tx.hash });
      } catch (error) {
        res.status(500).send({ error: err.message });
      }
    });

    app.post("/registerParty", async (req, res) => {
      const { name, shortname, color, bgcolor, url } = req.body;
      try {
        const contract = await loadContract();
        const tx = await contract.registerParty(name, shortname, color, bgcolor, url);
        await tx.wait();
        res.send({status: "success", tx: tx.hash});
      } catch (err) {
        res.status(500).send({ error: err.message });
      }
    });

    app.post("/registerCandidate", async (req, res) => {
      const { name, wahlbezirk, partei, url } = req.body;
      try {
        const contract = await loadContract();
        const tx = await contract.registerCandidate(name, wahlbezirk, partei, url);
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

    app.post("/storeElectionResult", async (req, res) => {
      const { wahlbezirk } = req.body;
      
      try {
        const contract = await loadContract();
        const encryptedVotes = await contract.getEncryptedVotes(wahlbezirk);
        console.log("Anzahl Stimmen: " + encryptedVotes.length);
        const decryptedVotes1 = [];
        const decryptedVotes2 = [];  
        
        for (let i = 0; i < encryptedVotes.length; i++) {         
          const encryptedVote = encryptedVotes[i];
          decryptedVotes1[i] = decryptStringVote(encryptedVote.vote1);
          decryptedVotes2[i] = decryptStringVote(encryptedVote.vote2);
        }

        // Erststimme
        const tally1 = tally(decryptedVotes1);
        const signature1 = signature(tally1);
        const tx1 = await contract.storeElectionResult1(tally1, signature1, wahlbezirk);
        await tx1.wait() 
        console.log("✅ Erststimmen gespeichert und Transaktion gesendet:", tx1.hash);

        // Zweitstimme        
        const tally2 = tally(decryptedVotes2);
        const signature2 = signature(tally2);
        const tx2 = await contract.storeElectionResult2(tally2, signature2, wahlbezirk);
        await tx2.wait() 
        console.log("✅ Zweitstimmen gespeichert und Transaktion gesendet:", tx2.hash);        
        
        res.send({ status: "success" });     
      } catch (err) {
        res.status(500).send({ error: err.message });
      }
    });
    app.listen(3001, () => console.log("API läuft auf Port 3001!"));
});