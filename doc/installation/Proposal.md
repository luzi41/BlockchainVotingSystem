This tutorial refers to the installation of voting system for proposals.

## 4 Backend API

### 4.1

Save the ABI in the election-system directory (replace filenames with your correct filenames) e.g.:

        cp artifacts/contracts/Registry.sol/Registry.json api/Registry.json &&
        cp artifacts/contracts/Proposals.sol/Proposals.json api/Proposals.json

### 4.2 Generate OpenSSL RSA private.pem and  public.pem

- Store private.pem in election-system/keys,
- The public key is stored in the smart contract via the API (see 5).

### 4.3 Install and start API

    cd api
    npm install express ethers node-forge // (once)
    node apiProposal.js

### 4.4 Fill blockchain with test data (candidates, voter hashs)

Open a new terminal and exec:

        curl -X POST http://localhost:3001/storePublicKey -H "Content-Type: application/json" -d '{"publicKey" : "`-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzySURgrOWXJv9H2bCvE2AgP0A9C5YqI4bATqaae6UxDsu0JajSx40m0Trg8zoJnYszvUSG/Z6/4sFvTvXuxb4F+kIjTQSHmkgjW1gYK/k55MddG0kjF/ZH8T0pXNCozTRmyp315vuPrB+0TDD+RPuK+HllSkZ+iPI3ddR6cGDNgKLMCUfJKvF91nrx/9ZBl3ZbW6Kla/5qO1BLURo1JShIq3K40khk+wwIkyPAeP0LLaPCw9RHyQzeFTevYN9zTYPvFuP2WDnlPXCefzzqA0XTxWcBGvMDH4qcXq86cPAPeuyiCrvrJWClHxgHlASLM50dLKxkI2XIvx8/Cd+glsiQIDAQAB-----END PUBLIC KEY-----`"}' &&
        curl -X POST http://localhost:3001/registerProposal -H "Content-Type: application/json" -d '{"name" : "Wasserversorgung privatisieren?", "text" : "Soll die Wasserversorgung in Entenhausen privatisiert werden?", "url" : "https://www.entenhausen.gov/water", "qtype" : "1", "answer1" : "Ja", "answer2" : "Nein"}' &&
        curl -X POST http://localhost:3001/registerToken -H "Content-Type: application/json" -d '{"token" : "SecretToken1", "electionDistrict" : "1"}' &&
        curl -X POST http://localhost:3001/registerToken -H "Content-Type: application/json" -d '{"token" : "SecretToken2", "electionDistrict" : "1"}' &&
        curl -X POST http://localhost:3001/registerToken -H "Content-Type: application/json" -d '{"token" : "SecretToken3", "electionDistrict" : "1"}' &&
        curl -X POST http://localhost:3001/registerToken -H "Content-Type: application/json" -d '{"token" : "SecretToken4", "electionDistrict" : "1"}' &&
        curl -X POST http://localhost:3001/registerToken -H "Content-Type: application/json" -d '{"token" : "SecretToken5", "electionDistrict" : "1"}' &&
        curl -X POST http://localhost:3001/registerToken -H "Content-Type: application/json" -d '{"token" : "SecretToken6", "electionDistrict" : "1"}' &&
        curl -X POST http://localhost:3001/registerToken -H "Content-Type: application/json" -d '{"token" : "SecretToken7", "electionDistrict" : "1"}' &&
        curl -X POST http://localhost:3001/registerToken -H "Content-Type: application/json" -d '{"token" : "SecretToken8", "electionDistrict" : "1"}' &&
        curl -X POST http://localhost:3001/registerToken -H "Content-Type: application/json" -d '{"token" : "SecretToken9", "electionDistrict" : "1"}' &&
        curl -X POST http://localhost:3001/registerToken -H "Content-Type: application/json" -d '{"token" : "SecretToken10", "electionDistrict" : "1"}' &&
        curl -X POST http://localhost:3001/registerToken -H "Content-Type: application/json" -d '{"token" : "SecretToken11", "electionDistrict" : "1"}' &&
        curl -X POST http://localhost:3001/registerToken -H "Content-Type: application/json" -d '{"token" : "SecretToken12", "electionDistrict" : "1"}' &&
        curl -X POST http://localhost:3001/registerToken -H "Content-Type: application/json" -d '{"token" : "SecretToken13", "electionDistrict" : "1"}' &&
        curl -X POST http://localhost:3001/registerToken -H "Content-Type: application/json" -d '{"token" : "SecretToken14", "electionDistrict" : "1"}' &&
        curl -X POST http://localhost:3001/registerToken -H "Content-Type: application/json" -d '{"token" : "SecretToken15", "electionDistrict" : "1"}' &&
        curl -X POST http://localhost:3001/registerToken -H "Content-Type: application/json" -d '{"token" : "SecretToken16", "electionDistrict" : "1"}' &&
        curl -X POST http://localhost:3001/registerToken -H "Content-Type: application/json" -d '{"token" : "SecretToken17", "electionDistrict" : "1"}' &&
        curl -X POST http://localhost:3001/registerToken -H "Content-Type: application/json" -d '{"token" : "SecretToken18", "electionDistrict" : "1"}' &&
        curl -X POST http://localhost:3001/registerToken -H "Content-Type: application/json" -d '{"token" : "SecretToken19", "electionDistrict" : "1"}' &&
        curl -X POST http://localhost:3001/registerToken -H "Content-Type: application/json" -d '{"token" : "SecretToken20", "electionDistrict" : "1"}' &&
        curl -X POST http://localhost:3001/registerToken -H "Content-Type: application/json" -d '{"token" : "SecretToken21", "electionDistrict" : "1"}' &&
        curl -X POST http://localhost:3001/registerToken -H "Content-Type: application/json" -d '{"token" : "SecretToken22", "electionDistrict" : "1"}' &&
        curl -X POST http://localhost:3001/registerToken -H "Content-Type: application/json" -d '{"token" : "SecretToken23", "electionDistrict" : "1"}' &&
        curl -X POST http://localhost:3001/registerToken -H "Content-Type: application/json" -d '{"token" : "SecretToken24", "electionDistrict" : "1"}'

## 4.5 Start voting phase:

    curl -X POST http://localhost:3001/startVoting -H "Content-Type: application/json" -d '{"title" : "Test-Election 2025"}'

## 4.6 Install and start frontend-UI

     cd frontend && $npm install

copy ABI to the frontend:

     cp  -R ../artifacts src/  

Start frontend:

     npm start
     
## 4.7 Test

- Open the React frontend in your browser (http://localhost:3002)
- Connect MetaMask
- goto /voteForm
- vote

### 4.7.1 Stop voting phase

    curl -X POST http://localhost:3001/endVoting

### 4.7.2 Counting the results

election-system/scripts$

    curl -X POST http://localhost:3001/storeElectionResult -H "Content-Type: application/json" 

### 4.7.3 See results in the browser

Navigate to http://localhost:3002/results

