const fs = require("fs");
const path = require("path");
const { Wallet, JsonRpcProvider, Contract } = require("ethers");
const forge = require("node-forge");


// Config laden
const PRIVATE_KEY_PATH = path.join(__dirname, "../keys/private.pem");
const contractAddress = fs.readFileSync("../api/deployment-address.txt", "utf8").trim();
const abi = require("../api/Election.json").abi;
const RESULT_OUTPUT_PATH = path.join(__dirname, "../frontend/src/results/aggregated.json");


// 1. Private Key laden
const privateKeyPem = fs.readFileSync(PRIVATE_KEY_PATH, "utf8");
const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);


// 2. Contract verbinden
const provider = new JsonRpcProvider("http://localhost:8545");
//const wallet = new Wallet("0x8bbbb1b345af56b560a5b20bd4b0ed1cd8cc9958a16262bc75118453cb546df7", provider);
const contract = new Contract(contractAddress, abi, provider);  
//const contract = new Contract(contractAddress, abi, wallet);

// 3. Stimmen abrufen und entschlüsseln
async function decryptVotes() {
  const decryptedVotes = [];
  const encryptedVotes = await contract.getEncryptedVotes();

  for (let i = 0; i < encryptedVotes.length; i++) {
    const encryptedVote = encryptedVotes[i];
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

// 4a Ergebnisse aggregieren und speichern (alt)
async function aggregateAndWrite() {
  const votes = await decryptVotes();
  const tally = {};  

  for (const name of votes) {
    tally[name] = (tally[name] || 0) + 1;
  }

  fs.writeFileSync(RESULT_OUTPUT_PATH, JSON.stringify(tally, null, 2));
  console.log("✅ Ergebnisse gespeichert unter:", RESULT_OUTPUT_PATH);
}

// 4b
async function aggregateAndStore() {
  const votes = await decryptVotes();
  const tally = {};

  for (const name of votes) {
    tally[name] = (tally[name] || 0) + 1;
  }

  const timestamp = new Date().toISOString();
 
  
  // Signieren der Ergebnisse
  // Erstellen des Hashes der Ergebnisse
  const md = forge.md.sha1.create();
  md.update(JSON.stringify(tally), 'utf8');
 
  const signature = forge.util.encode64(privateKey.sign(md));

  //console.log(signature)
  try {
    const tx = await contract.storeElectionResult(JSON.stringify(tally), signature);
    //await tx.wait() 
  } catch (error) {
      console.error("Fehler beim Speichern der Ergebnisse:", error);
  }
  

  //console.log("✅ Ergebnisse gespeichert und Transaktion gesendet: ", tx);
  //await tx.wait();
  //console.log("✅ Transaktion bestätigt:", tx.hash);
}

// alt: 
//aggregateAndWrite().catch(console.error);

// neu:
aggregateAndStore().catch(console.error);
// Hinweis: Diese Funktion aggregiert die Stimmen und speichert sie in der Blockchain.
