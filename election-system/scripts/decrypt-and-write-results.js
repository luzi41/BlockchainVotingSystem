const fs = require("fs");
const path = require("path");
const { ethers } = require("ethers");
const forge = require("node-forge");

// Config laden
const abi = require("./Election.json").abi;
const contractAddress = fs.readFileSync("deployment-address.txt", "utf8").trim();
const PRIVATE_KEY_PATH = path.join(__dirname, "../keys/private.pem");
const RESULT_OUTPUT_PATH = path.join(__dirname, "../frontend/src/results/aggregated.json");

// 1. Private Key laden
const privateKeyPem = fs.readFileSync(PRIVATE_KEY_PATH, "utf8");
const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);

// 2. Contract verbinden
const provider = new ethers.JsonRpcProvider("http://localhost:8545");
const contract = new ethers.Contract(contractAddress, abi, provider);

// 3. Stimmen abrufen und entschlüsseln
async function decryptVotes() {
  //const voteCount = await contract.getVoteCount();
  const decryptedVotes = [];
  const encryptedVotes = await contract.getEncryptedVotes();

  for (let i = 0; i < encryptedVotes.length; i++) {
    const encryptedVote = encryptedVotes(i);
    const encryptedBytes = Buffer.from(encryptedVote, "base64");

    try {
      const decrypted = privateKey.decrypt(encryptedBytes.toString("binary"), "RSA-OAEP");
      decryptedVotes.push(decrypted);
    } catch (err) {
      console.error(`Fehler beim Entschlüsseln der Stimme ${i}:`, err.message);
    }
  }

  return decryptedVotes;
}

// 4. Ergebnisse aggregieren und speichern
async function aggregateAndWrite() {
  const votes = await decryptVotes();
  const tally = {};

  for (const name of votes) {
    tally[name] = (tally[name] || 0) + 1;
  }

  fs.writeFileSync(RESULT_OUTPUT_PATH, JSON.stringify(tally, null, 2));
  console.log("✅ Ergebnisse gespeichert unter:", RESULT_OUTPUT_PATH);
}

aggregateAndWrite().catch(console.error);
