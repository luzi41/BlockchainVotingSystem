# Installation dev-version of BVS 
## 1 Preconditions
- Node.js (LTS)
- npm
- Git
- [Docker & Docker Compose](https://docker.com) (running as service, user access)
- curl command line
- MetaMask Browser Extension (only Web)

## 2 Quorum blockchain network

To create the tutorial docker-compose files and artifacts, run:
  
      npx quorum-dev-quickstart
  
Follow the prompts displayed to run GoQuorum and logging with ELK. Enter n for Codefi Orchestrate and y for private transactions.
To start the network, go to the installation directory (quorum-test-network if you used the default value) and run:

    ./run.sh
    
## 3 SmartContract and Frontend

git clone https://github.com/luzi41/BlockchainVotingSystem.git

### 3.1 Install Hardhat (only once)

Hardhat is a development environment for Ethereum software. It consists of different components for editing, compiling, debugging and deploying your smart contracts and dApps, all of which work together to create a complete development environment. see: https://hardhat.org/hardhat-runner/docs/getting-started#overview

    cd BlockchainVotingSystem/election-system
    npm init 
    npm install --save-dev hardhat prompt
    npx hardhat init 

### 3.2 Customize hardhat config

election-system$ 

    nano hardhat.config.js
    
If necessary, replace the account with suitable private keys or encrypted keystore of the account 
Member1 from quorum-test-network/config/nodes/Member1/accountPrivateKey.txt. (the network must be started).

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
### 3.3 Compile SmartContract

election-system$

    cd contracts
    npx hardhat compile

The compiled artifacts will be saved in the artifacts/ directory by default, or whatever your configured artifacts path is. [Hardhat documentation] (https://v2.hardhat.org/hardhat-runner/docs/guides/compile-contracts).

### 3.4 Deploy contract

election-system$

     npx hardhat run scripts/deployElection.js --network quorum 

- Save contract address in api/deployment-address.txt
- Replace also the contract address in frontend/.env

for further inststructions look at:
 
- go to: [Bundestagswahl.md](./Bundestagswahl.md) for parlamentary elections or
- go to: [Proposal.md](./Proposal.md) for voting about proposal
- ... (work in progress)