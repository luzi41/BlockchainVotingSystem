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
