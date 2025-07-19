This tutorial refers to a parliamentary election with two votes such as the federal election in Germany.

# 1 Preconditions
- Node.js (LTS)
- npm
- Git
- [Docker & Docker Compose](https://docker.com) (running as service, user access)
- curl command line
- MetaMask Browser Extension

# 2 Quorum blockchain network

To create the tutorial docker-compose files and artifacts, run:
  
      npx quorum-dev-quickstart
  
Follow the prompts displayed to run GoQuorum and logging with ELK. Enter n for Codefi Orchestrate and y for private transactions.
To start the network, go to the installation directory (quorum-test-network if you used the default value) and run:

    ./run.sh
    
# 3 SmartContract and Frontend

git clone https://github.com/luzi41/BlockchainVotingSystem.git

## 3.1 Install Hardhat (only once)

    cd BlockchainVotingSystem/election-system
    npm init 
    npm install --save-dev hardhat prompt
    npx hardhat init 

## 3.2 Customize hardhat config

election-system$ 

    nano hardhat.config.js
    
If necessary, replace the account with suitable private keys or encrypted keystore of the account 
Member1 from quorum-test-network/config/nodes/Member1/accountPivateKey.txt. (the network must be started).

    require("@nomicfoundation/hardhat-toolbox");
    module.exports = {
    solidity: "0.8.28",
    networks: {
      quorum: {
        url: "http://localhost:8545",
        accounts: {
          "0x8bbbb1b345af56b560a5b20bd4b0ed1cd..."
       }
      }
     }
    };

## 3.3 Compile SmartContract

election-system$

    cd contracts
    npx hardhat compile

## 3.4 Deploy contract

election-system$

     npx hardhat run scripts/deployElection.js --network quorum 

- Save contract address in api/deployment-address.txt
- Replace also the contract address in frontend/.env

# 4 Backend API

## 4.1

Save the ABI in the election-system directory (replace filenames with your correct filenames) e.g.:

    cp artifacts/contracts/Registry.sol/Registry.json api/Registry.json &&
    cp artifacts/contracts/Bundestagswahl.sol/Bundestagswahl.json api/Bundestagswahl.json

## 4.2 Generate OpenSSL RSA private.pem and  public.pem

- Store private.pem in election-system/keys,
- The public key is stored in the smart contract via the API (see 4.4 ".../registerElectionDistrict").

## 4.3 Install and start API

    cd api
    npm install express ethers node-forge // (once)
    node index.js

# 5 Fill blockchain with test data (candidates, voter hashs)

Open a new terminal and exec:

        curl -X POST http://localhost:3001/registerElectionDistrict -H "Content-Type: application/json" -d '{"name" : "Wahlkreis", "nummer" : "1", "publicKey" : "`-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzySURgrOWXJv9H2bCvE2AgP0A9C5YqI4bATqaae6UxDsu0JajSx40m0Trg8zoJnYszvUSG/Z6/4sFvTvXuxb4F+kIjTQSHmkgjW1gYK/k55MddG0kjF/ZH8T0pXNCozTRmyp315vuPrB+0TDD+RPuK+HllSkZ+iPI3ddR6cGDNgKLMCUfJKvF91nrx/9ZBl3ZbW6Kla/5qO1BLURo1JShIq3K40khk+wwIkyPAeP0LLaPCw9RHyQzeFTevYN9zTYPvFuP2WDnlPXCefzzqA0XTxWcBGvMDH4qcXq86cPAPeuyiCrvrJWClHxgHlASLM50dLKxkI2XIvx8/Cd+glsiQIDAQAB-----END PUBLIC KEY-----`"}' &&
        curl -X POST http://localhost:3001/registerElectionDistrict -H "Content-Type: application/json" -d '{"name" : "Wahlkreis", "nummer" : "2", "publicKey" : "`-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzySURgrOWXJv9H2bCvE2AgP0A9C5YqI4bATqaae6UxDsu0JajSx40m0Trg8zoJnYszvUSG/Z6/4sFvTvXuxb4F+kIjTQSHmkgjW1gYK/k55MddG0kjF/ZH8T0pXNCozTRmyp315vuPrB+0TDD+RPuK+HllSkZ+iPI3ddR6cGDNgKLMCUfJKvF91nrx/9ZBl3ZbW6Kla/5qO1BLURo1JShIq3K40khk+wwIkyPAeP0LLaPCw9RHyQzeFTevYN9zTYPvFuP2WDnlPXCefzzqA0XTxWcBGvMDH4qcXq86cPAPeuyiCrvrJWClHxgHlASLM50dLKxkI2XIvx8/Cd+glsiQIDAQAB-----END PUBLIC KEY-----`"}' &&
        curl -X POST http://localhost:3001/registerElectionDistrict -H "Content-Type: application/json" -d '{"name" : "Wahlkreis", "nummer" : "3", "publicKey" : "`-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzySURgrOWXJv9H2bCvE2AgP0A9C5YqI4bATqaae6UxDsu0JajSx40m0Trg8zoJnYszvUSG/Z6/4sFvTvXuxb4F+kIjTQSHmkgjW1gYK/k55MddG0kjF/ZH8T0pXNCozTRmyp315vuPrB+0TDD+RPuK+HllSkZ+iPI3ddR6cGDNgKLMCUfJKvF91nrx/9ZBl3ZbW6Kla/5qO1BLURo1JShIq3K40khk+wwIkyPAeP0LLaPCw9RHyQzeFTevYN9zTYPvFuP2WDnlPXCefzzqA0XTxWcBGvMDH4qcXq86cPAPeuyiCrvrJWClHxgHlASLM50dLKxkI2XIvx8/Cd+glsiQIDAQAB-----END PUBLIC KEY-----`"}' &&
        curl -X POST http://localhost:3001/registerParty -H "Content-Type: application/json" -d '{"name" : "Christlich Demokratische Union", "shortname" : "CDU", "color": "#fff", "bgcolor": "#000", "url": "https://www.cdu.de"}' &&
        curl -X POST http://localhost:3001/registerParty -H "Content-Type: application/json" -d '{"name" : "Sozialdemokratische Partei Deutschlands", "shortname" : "SPD", "color": "#fff", "bgcolor": "#FF0000 ", "url": "https://www.cdu.de"}' &&
        curl -X POST http://localhost:3001/registerParty -H "Content-Type: application/json" -d '{"name" : "Freie Demokratische Partei", "shortname" : "FDP", "color": "#8e44ad", "bgcolor": "#f1c40f", "url": "https://www.fdp.de"}' &&
        curl -X POST http://localhost:3001/registerParty -H "Content-Type: application/json" -d '{"name" : "Bündnis 90/Die Grünen", "shortname" : "Grüne", "color": "#fff", "bgcolor": "#27ae60", "url": "https://www.gruene.de"}' &&
        curl -X POST http://localhost:3001/registerParty -H "Content-Type: application/json" -d '{"name" : "Die Linke", "shortname" : "Linke", "color": "#fff", "bgcolor": "#c01c28", "url": "https://www.linke.de"}' &&
        curl -X POST http://localhost:3001/registerCandidate -H "Content-Type: application/json" -d '{"name": "Alice", "wahlbezirk": "1", "partei": "CDU", "url": "https://www.vorname-name.de"}' &&
        curl -X POST http://localhost:3001/registerCandidate -H "Content-Type: application/json" -d '{"name": "Bob", "wahlbezirk": "1", "partei": "SPD", "url": "https://www.vorname-name.de"}' &&
        curl -X POST http://localhost:3001/registerCandidate -H "Content-Type: application/json" -d '{"name": "Charly", "wahlbezirk": "1", "partei": "FDP", "url": "https://www.vorname-name.de"}' &&
        curl -X POST http://localhost:3001/registerCandidate -H "Content-Type: application/json" -d '{"name": "Denise", "wahlbezirk": "1", "partei": "Grüne", "url": "https://www.vorname-name.de"}' &&
        curl -X POST http://localhost:3001/registerCandidate -H "Content-Type: application/json" -d '{"name": "Emily", "wahlbezirk": "1", "partei": "Linke", "url": "https://www.vorname-name.de"}' &&
        curl -X POST http://localhost:3001/registerCandidate -H "Content-Type: application/json" -d '{"name": "Fritz", "wahlbezirk": "2", "partei": "CDU", "url": "https://www.vorname-name.de"}' &&
        curl -X POST http://localhost:3001/registerCandidate -H "Content-Type: application/json" -d '{"name": "Gertrud", "wahlbezirk": "2", "partei": "SPD", "url": "https://www.vorname-name.de"}' &&
        curl -X POST http://localhost:3001/registerCandidate -H "Content-Type: application/json" -d '{"name": "Harry", "wahlbezirk": "2", "partei": "FDP", "url": "https://www.vorname-name.de"}' &&
        curl -X POST http://localhost:3001/registerCandidate -H "Content-Type: application/json" -d '{"name": "Isolde", "wahlbezirk": "2", "partei": "Grüne", "url": "https://www.vorname-name.de"}' &&
        curl -X POST http://localhost:3001/registerCandidate -H "Content-Type: application/json" -d '{"name": "Jason", "wahlbezirk": "2", "partei": "Linke", "url": "https://www.vorname-name.de"}' &&
        curl -X POST http://localhost:3001/registerCandidate -H "Content-Type: application/json" -d '{"name": "Karla", "wahlbezirk": "3", "partei": "CDU", "url": "https://www.vorname-name.de"}' &&
        curl -X POST http://localhost:3001/registerCandidate -H "Content-Type: application/json" -d '{"name": "Louis", "wahlbezirk": "3", "partei": "SPD", "url": "https://www.vorname-name.de"}' &&
        curl -X POST http://localhost:3001/registerCandidate -H "Content-Type: application/json" -d '{"name": "Mandy", "wahlbezirk": "3", "partei": "FDP", "url": "https://www.vorname-name.de"}' &&
        curl -X POST http://localhost:3001/registerCandidate -H "Content-Type: application/json" -d '{"name": "Nele", "wahlbezirk": "3", "partei": "Grüne", "url": "https://www.vorname-name.de"}' &&
        curl -X POST http://localhost:3001/registerCandidate -H "Content-Type: application/json" -d '{"name": "Otto", "wahlbezirk": "3", "partei": "Linke", "url": "https://www.vorname-name.de"}' &&
        curl -X POST http://localhost:3001/registerToken -H "Content-Type: application/json" -d '{"token" : "SecretToken1", "electionDistrict" : "1"}' &&
        curl -X POST http://localhost:3001/registerToken -H "Content-Type: application/json" -d '{"token" : "SecretToken2", "electionDistrict" : "1"}' &&
        curl -X POST http://localhost:3001/registerToken -H "Content-Type: application/json" -d '{"token" : "SecretToken3", "electionDistrict" : "1"}' &&
        curl -X POST http://localhost:3001/registerToken -H "Content-Type: application/json" -d '{"token" : "SecretToken4", "electionDistrict" : "1"}' &&
        curl -X POST http://localhost:3001/registerToken -H "Content-Type: application/json" -d '{"token" : "SecretToken5", "electionDistrict" : "1"}' &&
        curl -X POST http://localhost:3001/registerToken -H "Content-Type: application/json" -d '{"token" : "SecretToken6", "electionDistrict" : "1"}' &&
        curl -X POST http://localhost:3001/registerToken -H "Content-Type: application/json" -d '{"token" : "SecretToken7", "electionDistrict" : "1"}' &&
        curl -X POST http://localhost:3001/registerToken -H "Content-Type: application/json" -d '{"token" : "SecretToken8", "electionDistrict" : "1"}' &&
        curl -X POST http://localhost:3001/registerToken -H "Content-Type: application/json" -d '{"token" : "SecretToken9", "electionDistrict" : "2"}' &&
        curl -X POST http://localhost:3001/registerToken -H "Content-Type: application/json" -d '{"token" : "SecretToken10", "electionDistrict" : "2"}' &&
        curl -X POST http://localhost:3001/registerToken -H "Content-Type: application/json" -d '{"token" : "SecretToken11", "electionDistrict" : "2"}' &&
        curl -X POST http://localhost:3001/registerToken -H "Content-Type: application/json" -d '{"token" : "SecretToken12", "electionDistrict" : "2"}' &&
        curl -X POST http://localhost:3001/registerToken -H "Content-Type: application/json" -d '{"token" : "SecretToken13", "electionDistrict" : "2"}' &&
        curl -X POST http://localhost:3001/registerToken -H "Content-Type: application/json" -d '{"token" : "SecretToken14", "electionDistrict" : "2"}' &&
        curl -X POST http://localhost:3001/registerToken -H "Content-Type: application/json" -d '{"token" : "SecretToken15", "electionDistrict" : "2"}' &&
        curl -X POST http://localhost:3001/registerToken -H "Content-Type: application/json" -d '{"token" : "SecretToken16", "electionDistrict" : "2"}' &&
        curl -X POST http://localhost:3001/registerToken -H "Content-Type: application/json" -d '{"token" : "SecretToken17", "electionDistrict" : "3"}' &&
        curl -X POST http://localhost:3001/registerToken -H "Content-Type: application/json" -d '{"token" : "SecretToken18", "electionDistrict" : "3"}' &&
        curl -X POST http://localhost:3001/registerToken -H "Content-Type: application/json" -d '{"token" : "SecretToken19", "electionDistrict" : "3"}' &&
        curl -X POST http://localhost:3001/registerToken -H "Content-Type: application/json" -d '{"token" : "SecretToken20", "electionDistrict" : "3"}' &&
        curl -X POST http://localhost:3001/registerToken -H "Content-Type: application/json" -d '{"token" : "SecretToken21", "electionDistrict" : "3"}' &&
        curl -X POST http://localhost:3001/registerToken -H "Content-Type: application/json" -d '{"token" : "SecretToken22", "electionDistrict" : "3"}' &&
        curl -X POST http://localhost:3001/registerToken -H "Content-Type: application/json" -d '{"token" : "SecretToken23", "electionDistrict" : "3"}' &&
        curl -X POST http://localhost:3001/registerToken -H "Content-Type: application/json" -d '{"token" : "SecretToken24", "electionDistrict" : "3"}'
    
# 6 Start voting phase:

    curl -X POST http://localhost:3001/startVoting -H "Content-Type: application/json" -d '{"title" : "Test-Election 2025"}'

# 7 Install and start frontend-UI

Install: 

     cd frontend && $npm install

copy ABI to the frontend:

     cp  -R ../artifacts src/  

Start frontend:

     npm start
     
# 8 Test

- Open the React frontend in your browser (http://localhost:3002)
- Connect MetaMask
- goto /voteForm
- Select candidate & vote

## 8.1 Stop voting phase

    curl -X POST http://localhost:3001/endVoting

## 8.2 Counting the results

election-system/scripts$

    curl -X POST http://localhost:3001/storeElectionResult -H "Content-Type: application/json" -d '{"wahlbezirk" : "1"}' &&
    curl -X POST http://localhost:3001/storeElectionResult -H "Content-Type: application/json" -d '{"wahlbezirk" : "2"}' &&
    curl -X POST http://localhost:3001/storeElectionResult -H "Content-Type: application/json" -d '{"wahlbezirk" : "3"}'

## 8.3 See results 

- Navigate to http://localhost:3002/results (Browser app)
- or go to "Results" (Ergebnisse) (Desktop/Mobile app)
