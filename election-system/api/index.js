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
    /*
    function decryptBytes(_bytes) {
      const encryptedBytes = Buffer.from(_bytes, "base64");
      const decrypted = privateKey.decrypt(encryptedBytes.toString("binary"), "RSA-OAEP");
      return decrypted;
    }
    */

    app.post("/registerElectionDistrict", async (req, res) => {
      const {name, nummer} = req.body;
      try {
        const contract = await loadContract();
        const tx = await contract.registerElectionDistrict(name, nummer);
        await tx.wait();
        res.send({status: "success", tx: tx.hash });
      } catch (error) {
        res.status(500).send({ error: err.message });
      }
    });

    app.post("/registerParty", async (req, res) => {
      const { name, shortname } = req.body;
      try {
        const contract = await loadContract();
        const tx = await contract.registerParty(name, shortname);
        await tx.wait();
        res.send({status: "success", tx: tx.hash});
      } catch (err) {
        res.status(500).send({ error: err.message });
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
        //const decryptedVotes2 = [];  
        
        for (let i = 0; i < encryptedVotes.length; i++) {
          const encryptedVote = encryptedVotes[i];
          // Erststimme
          const eVote1 = encryptedVote.vote1;
          // in eigene Hilfsfunktion?!
          const encryptedBytes = Buffer.from(eVote1, "base64");
          const decrypted1 = privateKey.decrypt(encryptedBytes.toString("binary"), "RSA-OAEP");
          //const decrypted1 = decryptBytes(eVote1); // <- das auch in die Hilfsfunktion?
          console.log("Stimme " + i + "= " + decrypted1) // <- das auch in die Hilfsfunktion?
          decryptedVotes1[i] = decrypted1; // <- das auch in die Hilfsfunktion? (return)

          // Zweitstimme
          /*
          const eVote2 = encryptedVote.vote2;
          const decrypted2 = decryptBytes(eVote2);
          console.log("Stimme " + i + "= " + decrypted2)
          decryptedVotes2[i] = decrypted2;
          */
        }
        
        // Erststimme Tally
        const tally1 = {};
        for (const name of decryptedVotes1) {
          tally1[name] = (tally1[name] || 0) + 1;
        }
        const timestamp = new Date().toISOString();
        const md = forge.md.sha1.create();
        md.update(JSON.stringify(tally1), 'utf8');
        const signature = forge.util.encode64(privateKey.sign(md));  
        const tx = await contract.storeElectionResult(JSON.stringify(tally1), signature, wahlbezirk);
        await tx.wait() 
        console.log("✅ Ergebnisse gespeichert und Transaktion gesendet:", tx.hash);

        // Zweitstimme ... kommt noch
        
        res.send({ status: "success" });     
      } catch (err) {
        res.status(500).send({ error: err.message });
      }
    });
    app.listen(3001, () => console.log("API läuft auf Port 3001!"));
});