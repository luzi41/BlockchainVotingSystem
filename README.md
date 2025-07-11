
# ![BVS Logo](./images/BVS_Logo.png) Blockchain Voting System
The motivation for developing a new system for conducting online elections and surveys lies in the advantages such a system offers, provided transparency, security, and organizational issues are satisfactorily resolved:
1. New opportunities for democratic participation, thus increasing political influence
2. Voters can vote from any time and location, increasing voter turnout
3. Long-term reduction in election costs

The second point (voters' independence from time and place) seems particularly crucial to me; this function has so far been represented in conventional elections primarily by the option of postal voting. Using an online voting system could make elections possible even in places where conventional elections can only be held under very difficult conditions. The advantages of independence from time and place would be particularly evident in countries with weak infrastructure or in countries suffering from civil war or terrorism, since it is precisely in places where there is a weak or destroyed infrastructure that mobile internet use is already widespread among all segments of the population and is growing faster than in developed industrialized countries.

# 1. Objectives 

A secure, privacy-compliant and traceable online voting system for surveys and elections that: 
- allows only registered voters to cast their votes,
- guarantees the anonymity of the vote,
- documents essential election processes in an audit-proof manner (blockchain),
- automatically counts the votes after the polls close and reports them to the returning officer,
- complies with the requirements of the Federal Elections Act.

## 1.2. Requirements 

Authentication and anonymity For a democratic election, it must be ensured that only eligible voters can cast their votes and that each eligible voter has the same number of votes. At the same time, the anonymity of the votes cast must be preserved. One of the requirements for the integrity of an online election is that the election result must be conclusively verified. This requirement is called End-To-End Verifiability (E2E-V). The objectives of a verification of an election are: Selection as intended; registered as selected and counted as registered. 
This means that it must be verifiable:

- Has the intended candidate been elected? For example, if the candidates on the lists were swapped, a voter could unintentionally make the wrong choice.
- Was the vote transmitted and stored as elected? Due to manipulation in transmission or storage, votes can be lost or stored twice in an online voting system.
- Was the vote also counted as it was stored?

## 1.3 Secrecy and mechanism against extortion 

An online voting system must guarantee a secret ballot. Since an online election takes place under "uncontrolled" conditions (not at the polling station but at home on insecure devices), it must also be ensured that no mass vote buying, blackmail, etc. is technically possible without this being discovered. This means that the system is not allowed to reveal, for example, how a particular voter voted. Implementation of this requirement ultimately requires identity management, which must be separated from the casting of votes (like the polling booth in a polling station in a conventional election).
The problem of potential blackmail extends the requirement of mere secrecy: the danger of votes being bought or blackmailed can only be prevented if a voter does not have the opportunity to prove how she voted. If she were able to do so, a blackmailer could demand this receipt and she would be susceptible to blackmail. A requirement that is therefore placed on electronic voting systems is referred to in the literature as "coercion resistance". In addition, a possible blackmailer must not have the opportunity to establish a connection between the voter and her voting decision, even without the cooperation of the voter. In order to meet the requirements of secrecy and resilience, it is necessary to encrypt voting decisions when they are transferred to the blockchain in such a way that the blackmailer has no possibility of obtaining a key from the victim or the victim's computer to decrypt the data in order to gain knowledge of the voter's actual voting decision – whether with or without the cooperation of the voter.

# 2. System Components (Architecture Overview)

## A Frontend

Platforms: Web & Mobile 
Functions: 
- Authentication
- Display of the ballot paper
- Voting and encryption Confirmation (anonymized)

## B. Backend

- Microservice architecture, containerized (e.g. Docker/Kubernetes)
- Key services:
  - Registration service: verifies eligibility to vote and creates encrypted token for voting system
  - Voter authentication: Integrates e.g. eID, ID card with online function or ELSTER certificate
  - Voting Service: Accepts Vote
  - Blockchain service: Persists election events (registration, token issuance, voting, storing the encrypted vote)
  - Counting service: Automatically carries out the counting after the polls close
  - Reporting service: Transmits result with checksums to the returning officer

## C Blockchain component 

- Permissioned blockchain (e.g. Hyperledger Fabric or Quorum)
- Nodes: Electoral Commission, Parties, Neutral Observers
- Entries: registrations (hash),
- votes cast (anonymous, tokens + timestamps only),
- counting results,
- event logs

# 3. Electoral process (End-to-End)

![Sequence diagram](images/Wahlsequenzdiagramm.png "Election process")

## 3.1 Registration

- User authenticates with official ID document
- Verification by registration service (connection to population register)
- Token issuance to the user (will be needed later to vote)
- Registration logged on blockchain (only hash of the token)

## 3.2 Voting

- User logs in with token in the frontend
- Voice is encrypted locally in the browser (end-to-end)
- Vote (anonymous) and token (signed) are sent to the backend
- Token will be cancelled (no multiple submission possible)
- Blockchain: Entry with timestamp, token hash, transaction ID

## 3.3 Counting & Transmission of Results

- After the polls close: votes are aggregated by the counting service
- Validation against blockchain (only valid, not duplicate tokens)
- Result + blockchain reference transmitted to election officer

## 3.4 Results

- Results publicly viewable via a dashboard (verified via blockchain)


# 4. Installation (Prototype)

The prototype refers to a parliamentary election such as the federal election in Germany.

## Preconditions
- Node.js (LTS)
- npm
- Git
- [Docker & Docker Compose](https://docker.com) (running as service, user access)
- curl command line
- MetaMask Browser Extension

## 4.1 Quorum blockchain network

To create the tutorial docker-compose files and artifacts, run:
  
      npx quorum-dev-quickstart
  
Follow the prompts displayed to run GoQuorum and logging with ELK. Enter n for Codefi Orchestrate and y for private transactions.
To start the network, go to the installation directory (quorum-test-network if you used the default value) and run:

    ./run.sh
    
## 4.2 SmartContract

git clone https://github.com/luzi41/BlockchainVotingSystem.git

### 4.2.1 Install Hardhat (only once)

    cd BlockchainVotingSystem/election-system
    npm init 
    npm install --save-dev hardhat prompt
    npx hardhat init 

### 4.2.2 Customize hardhat config

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

### 4.2.3 Compile SmartContract

election-system$

    cd contracts
    npx hardhat compile

### 4.2.4 Deploy contract

election-system$

     npx hardhat run scripts/deployElection.js --network quorum 

- Save contract address in api/deployment-address.txt
- Replace also the contract address in frontend/src/config.js

## 4.3 Backend API

### 4.3.1

Save the ABI in the election-system directory (replace filenames with your correct filenames) e.g.:

    cp artifacts/contracts/Registry.sol/Registry.json api/Registry.json &&
    cp artifacts/contracts/Bundestagswahl.sol/Bundestagswahl.json api/Bundestagswahl.json

### 4.3.2 Generate OpenSSL RSA private.pem and  public.pem

- Store private.pem in election-system/keys,
- Replace public.key ascii-text in election-system/frontend/src/components/voteForm.js.

### 4.3.3 Install and start API

    cd api
    npm install express ethers node-forge // (once)
    node index.js

## 4.4 Fill blockchain with test data (candidates, voter hashs)

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
- Select candidate & vote

### 4.7.1 Stop voting phase

    curl -X POST http://localhost:3001/endVoting

### 4.7.2 Counting the results

election-system/scripts$

    curl -X POST http://localhost:3001/storeElectionResult -H "Content-Type: application/json" -d '{"wahlbezirk" : "1"}' &&
    curl -X POST http://localhost:3001/storeElectionResult -H "Content-Type: application/json" -d '{"wahlbezirk" : "2"}' &&
    curl -X POST http://localhost:3001/storeElectionResult -H "Content-Type: application/json" -d '{"wahlbezirk" : "3"}'

### 4.7.3 See results in the browser

Navigate to http://localhost:3002/results

# 5. Changes

- V 0.17: Smart Contract: Bundestagswahl (Germany)
- V 0.18: German Bundestagswahl: Zweitstimme

# 6. Todo

- Election templates: different kinds of elections and surveys (V 1.0)
