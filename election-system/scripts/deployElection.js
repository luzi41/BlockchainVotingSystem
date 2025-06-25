const fs = require("fs");
const hre = require("hardhat");
const prompt = require('prompt');

prompt.start();

prompt.get(['PathToQuorum'], function (err, result) {
    if (err) { return onErr(err); }
    console.log('Command-line input received:');
    console.log('  PathToQuorum: ' + result.PathToQuorum);

    async function main() {
    // Admin-Wallet laden
    const keystore = fs.readFileSync(result.PathToQuorum + "/config/nodes/member1/accountKeystore", "utf8");
    const password = fs.readFileSync(result.PathToQuorum + "/config/nodes/member1/accountPassword", "utf8").trim();
    const wallet = await hre.ethers.Wallet.fromEncryptedJson(keystore, password);

    // Verbindung zum Quorum-Netzwerk
    const provider = new hre.ethers.JsonRpcProvider("http://localhost:8545");
    const admin = wallet.connect(provider);

    // Contract factory und Deployment
    const Election = await hre.ethers.getContractFactory("Bundestagswahl", admin);
    const election = await Election.deploy();
    
    console.log("Contract address: " + election.target);
    }

    main().catch((error) => {
      console.error(error);
      process.exitCode = 1;
    });    
});
