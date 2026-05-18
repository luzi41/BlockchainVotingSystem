# Installation dev-version of BVS 
## 1 Preconditions
- Node.js (LTS)
- npm
- Git
- [Docker & Docker Compose](https://docker.com) (running as service, user access)
- curl command line
- MetaMask Browser Extension (only Web)

## 2 Besu blockchain network

### 2.1 Create folders
To create the tutorial docker-compose files and artifact, we create the Beso blockchain service as docker containers.

    </>bash
    
    mkdir besu-network
    mkdir -p \
    networkFiles \
    data/
  
### 2.2 Create QBFT config

networkFiles/config.json
    
    </>JSON
    {
      "genesis": {
        "config": {
          "chainId": 1337,
          "berlinBlock": 0,
          "qbft": {
            "blockperiodseconds": 2,
            "epochlength": 30000,
            "requesttimeoutseconds": 10
          }
        },
        "nonce": "0x0",
        "timestamp": "0x58ee40ba",
        "gasLimit": "0x1fffffffffffff",
        "difficulty": "0x1",
        "mixHash": "0x63746963616c2062797a616e74696e65206661756c7420746f6c6572616e6365",
        "coinbase": "0x0000000000000000000000000000000000000000",
        "alloc": {},
        "number": "0x0",
        "gasUsed": "0x0",
        "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000"
      },
      "blockchain": {
        "nodes": {
          "generate": true,
          "count": 4
        }
      }
    }

### 2.3 Create validator keys and genesis

Now the generator works correctly

        </>bash
        docker run --rm \
        -v $(pwd)/networkFiles:/config \
        hyperledger/besu:24.5.2 \
        operator generate-blockchain-config \
        --config-file=/config/config.json \
        --to=/config/generated

### 2.4 Check results

        </>bash
        ls networkFiles/generated

### 2.5 Show validator folders

        </>bash
        ls networkFiles/generated/keys
        
you get 4 folders

Example:

        0x8f...
        0xa2...
        0xb7...
        0xc9...

### 2.6 First testing one validator: create docker-compose

File: docker-compose.yml

Content:

    </>YAML
    services:
    
      validator1:
        image: hyperledger/besu:24.5.2
        platform: linux/amd64
        container_name: validator1
        volumes:
          - ./networkFiles/generated/genesis.json:/config/genesis.json
          - ./networkFiles/generated/keys/0x8f...:/opt/besu/keys
          - ./data/validator1:/data
        command: >
          --genesis-file=/config/genesis.json
          --data-path=/data
          --node-private-key-file=/opt/besu/keys/key
          --rpc-http-enabled
          --rpc-http-api=ETH,NET,QBFT,WEB3
          --host-allowlist=*
          --rpc-http-cors-origins=all
          --rpc-http-port=8545
          --p2p-port=30303
        ports:
          - "8545:8545"
          - "30303:30303"

### 2.7 Important: adjust validator key path

This you have to replace with the correct folder names (from networkFiles/generated/keys)

        </>YAML
        0x8f...

### 2.8 Starting network

        </> Bash
        docker compose up -d

### 2.9 Check

        </> Bash
        docker ps

Now, validator1 should be running.

### 2.10 Checking logs

        </> Bash
        docker compose logs -f validator1

You should see:

        Imported #1

### 2.11 Expand docker-compose

        </>bash
        ls networkFiles/generated/keys

You have to replace the key paths with the corrrect folder names.

    services:
    
      validator1:
        image: hyperledger/besu:24.5.2
        platform: linux/amd64
        container_name: validator1
        volumes:
          - ./networkFiles/generated/genesis.json:/config/genesis.json
          - ./networkFiles/generated/keys/0x111...:/opt/besu/keys
          - ./data/validator1:/data
        command: >
          --genesis-file=/config/genesis.json
          --data-path=/data
          --node-private-key-file=/opt/besu/keys/key
          --rpc-http-enabled
          --rpc-http-api=ETH,NET,QBFT,WEB3
          --host-allowlist=*
          --rpc-http-cors-origins=all
          --rpc-http-port=8545
          --p2p-port=30303
        ports:
          - "8545:8545"
          - "30303:30303"
    
      validator2:
        image: hyperledger/besu:24.5.2
        platform: linux/amd64
        container_name: validator2
        volumes:
          - ./networkFiles/generated/genesis.json:/config/genesis.json
          - ./networkFiles/generated/keys/0x222...:/opt/besu/keys
          - ./data/validator2:/data
        command: >
          --genesis-file=/config/genesis.json
          --data-path=/data
          --node-private-key-file=/opt/besu/keys/key
          --p2p-port=30304
          --rpc-http-enabled
          --rpc-http-api=ETH,NET,QBFT,WEB3
          --host-allowlist=*
          --rpc-http-cors-origins=all
          --rpc-http-port=8546
        ports:
          - "8546:8546"
          - "30304:30304"
    
      validator3:
        image: hyperledger/besu:24.5.2
        platform: linux/amd64
        container_name: validator3
        volumes:
          - ./networkFiles/generated/genesis.json:/config/genesis.json
          - ./networkFiles/generated/keys/0x333...:/opt/besu/keys
          - ./data/validator3:/data
        command: >
          --genesis-file=/config/genesis.json
          --data-path=/data
          --node-private-key-file=/opt/besu/keys/key
          --p2p-port=30305
          --rpc-http-enabled
          --rpc-http-api=ETH,NET,QBFT,WEB3
          --host-allowlist=*
          --rpc-http-cors-origins=all
          --rpc-http-port=8547
        ports:
          - "8547:8547"
          - "30305:30305"
    
      validator4:
        image: hyperledger/besu:24.5.2
        platform: linux/amd64
        container_name: validator4
        volumes:
          - ./networkFiles/generated/genesis.json:/config/genesis.json
          - ./networkFiles/generated/keys/0x444...:/opt/besu/keys
          - ./data/validator4:/data
        command: >
          --genesis-file=/config/genesis.json
          --data-path=/data
          --node-private-key-file=/opt/besu/keys/key
          --p2p-port=30306
          --rpc-http-enabled
          --rpc-http-api=ETH,NET,QBFT,WEB3
          --host-allowlist=*
          --rpc-http-cors-origins=all
          --rpc-http-port=8548
        ports:
          - "8548:8548"
          - "30306:30306"

Replace

        0x111...
        0x222...
        0x333...
        0x444...

with the correct folder names.

### 2.12 Stopping validator1

If validator1 is still running:

        </> Bash
        
        docker compose down

### 2.13 Start all validators

        </> Bash
        
        docker compose up -d

### 2.14 Check

        </> Bash
        
        docker ps

Jyou should see:
        
        validator1
        validator2
        validator3
        validator4

### 2.15 Check logs

        </> Bash

        docker compose logs -f

You should see:

        Imported #1
        Imported #2
        Imported #3
        imported #4

### 2.16 Testing rpc

Validator1:

        </> Bash
        
        curl -X POST http://localhost:8545 \
        -H "Content-Type: application/json" \
        --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}'

Validator2:

        </> Bash
        
        curl -X POST http://localhost:8546 \
        -H "Content-Type: application/json" \
        --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}'

All should show the same block height.

#### 2.17 Result

✅ 4 Validators

✅ QBFT Consensus

✅ persistent Validator-Keys

✅ produktion near strukture

✅ stabie Besu-Netzwerk

✅ ARM-Mac compatible

### 2.18
When the docker-container with 4 validator nodes are running correctly, we should expand the configuration files to add a bootnode.
Currently, nodes likely discover each other only via internal Docker discovery or initial peer connections.

For:

- restarts
- scaling
- multiple hosts
- stable peer discovery

you should have at least one dedicated bootnode.

Validators Expose RPC Publicly

Currently, every validator has:

        --rpc-http-enabled

This is not ideal.

Better:

- Validators → Consensus only
- Separate RPC node → Frontend/API/Hardhat

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
