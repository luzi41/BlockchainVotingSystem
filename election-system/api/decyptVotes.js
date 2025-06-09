const fs = require("fs");
const forge = require("node-forge");
const privateKeyPem = fs.readFileSync("api/keys/private.pem", "utf8");
const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);

// Beispielstimmen vom Contract holen oder testen
const encryptedVotes = [
  "base64enc_vote1", "base64enc_vote2" // ...
];

const tally = {};

encryptedVotes.forEach(enc => {
  const decrypted = privateKey.decrypt(forge.util.decode64(enc), "RSA-OAEP");
  tally[decrypted] = (tally[decrypted] || 0) + 1;
});

console.log("Ergebnis:", tally);
