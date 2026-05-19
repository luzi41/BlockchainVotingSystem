# Hyperledger Besu Network
## 1 Create folders
To create the tutorial docker-compose files and artifact, we create the Beso blockchain service as docker containers.

    </>bash
    
    mkdir besu-network
    mkdir -p \
    networkFiles \
    data/
  
## 2 Create QBFT config

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

## 3 Create validator keys and genesis

Now the generator works correctly

        </>bash
        docker run --rm \
        -v $(pwd)/networkFiles:/config \
        hyperledger/besu:24.5.2 \
        operator generate-blockchain-config \
        --config-file=/config/config.json \
        --to=/config/generated

## 4 Check results

        </>bash
        ls networkFiles/generated

## 5 Show validator folders

        </>bash
        ls networkFiles/generated/keys
        
you get 4 folders

Example:

        0x8f...
        0xa2...
        0xb7...
        0xc9...

## 6 First testing one validator: create docker-compose

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

## 7 Important: adjust validator key path

This you have to replace with the correct folder names (from networkFiles/generated/keys)

        </>YAML
        0x8f...

## 8 Starting network

        </> Bash
        docker compose up -d

## 9 Check

        </> Bash
        docker ps

Now, validator1 should be running.

## 10 Checking logs

        </> Bash
        docker compose logs -f validator1

You should see:

        Imported #1

## 11 Expand docker-compose

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

## 12 Stopping validator1

If validator1 is still running:

        </> Bash
        
        docker compose down

## 13 Start all validators

        </> Bash
        
        docker compose up -d

## 14 Check

        </> Bash
        
        docker ps

You should see:
        
        validator1
        validator2
        validator3
        validator4

## 15 Check logs

        </> Bash

        docker compose logs -f

You should see:

        Imported #1
        Imported #2
        Imported #3
        imported #4

## 16 Testing rpc

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

## 17 Result

✅ 4 Validators

✅ QBFT Consensus

✅ persistent Validator-Keys

✅ produktion near strukture

✅ stabie Besu-Netzwerk

✅ ARM-Mac compatible

## 18 Expand Besu Network
When the docker-container with 4 validator nodes are running correctly, we should expand the configuration files to add a bootnode.
Currently, nodes likely discover each other only via internal Docker discovery or initial peer connections.
### 18.1 What's missing
#### 1. Bootnode
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
- 
### 2.  Validators expose RPC publicly.
Currently, every validator has:

        --rpc-http-enabled

This is not ideal.

A better approach:

Validators → Consensus only
Separate RPC node → Frontend/API/Hardhat

#### 3. No static-nodes.json
Currently, the network relies solely on Discovery.

For private networks, the following is more stable:

        config/static-nodes.json

#### 4.No seperate docker network
We should define that explicitly

#### 5. No RPC Gateway
Your:

- Tauri Frontend
- Next.js
- Hardhat
- API

should not be directly coupled to Validator1 later on.

### 18.2 Target structure

        besu-network/
        ├── docker-compose.yml
        ├── config/
        │   ├── genesis.json
        │   ├── static-nodes.json
        │   └── permissions_config.toml
        │
        ├── data/
        │  ├── validator1/
        │  ├── validator2/
        │  ├── validator3/
        │  ├── validator4/
        │  ├── rpc-node/
        │  └── bootnode/
        │
        ├── networkFiles/
        │   └── generated/
        │
        └── logs/

#### Step 1 -- Add bootnode
New service (At beginning in docker-compose.yml):
        bootnode:
          image: hyperledger/besu:24.5.2
          container_name: bootnode
        
          volumes:
            - ./networkFiles/generated/genesis.json:/config/genesis.json
            - ./networkFiles/generated/keys/bootnode:/opt/besu/keys
            - ./data/bootnode:/data
        
          command: >
            --genesis-file=/config/genesis.json
            --data-path=/data
            --node-private-key-file=/opt/besu/keys/key
            --p2p-host=bootnode
            --p2p-port=30301
            --rpc-http-enabled=false
        
          ports:
            - "30301:30301"

#### Step 2 -- static-nodes.json erzeugen
        [
          "enode://....@bootnode:30301",
          "enode://....@validator1:30303",
          "enode://....@validator2:30304",
          "enode://....@validator3:30305",
          "enode://....@validator4:30306"
        ]
We then mount this file into all nodes.

#### Step 3 -- Add a Dedicated RPC Node
Very important for the election platform.
        rpcnode:
          image: hyperledger/besu:24.5.2
          container_name: rpcnode
        
          volumes:
            - ./networkFiles/generated/genesis.json:/config/genesis.json
            - ./data/rpc-node:/data
        
          command: >
            --genesis-file=/config/genesis.json
            --data-path=/data
            --rpc-http-enabled
            --rpc-http-api=ETH,NET,QBFT,WEB3,TXPOOL
            --host-allowlist=*
            --rpc-http-cors-origins=all
            --rpc-http-host=0.0.0.0
            --rpc-http-port=8545
            --bootnodes=enode://...
        
          ports:
            - "8545:8545"

Then:

- Hardhat → rpcnode
- Frontend → rpcnode
- API → rpcnode

NOT directly to validators.

#### Step 4 — Secure validators

Validators should eventually:

- have no public RPC
- have no open APIs

For development purposes, you can leave them enabled for now.

Later on, however:

        --rpc-http-enabled=false

#### Step 5 — Define Docker Network

        networks:
          besu-net:
            driver: bridge

#### Most important next step
Before we proceed, we now need the actual enode IDs of the validators. To do this, of course, the correct enode IDs can be found in the respective logs. E.g.:

        docker logs validator1

or

        curl -X POST --data '{"jsonrpc":"2.0","method":"admin_nodeInfo","params":[],"id":1}' \
        http://localhost:8545

Then we can:

- Correctly configure the bootnode
- Build `static-nodes.json`
- Seamlessly integrate the RPC node
- Stabilize the network

After that, your network will be ready for:

- Hardhat
- Registry Deployment
- Election Factory
- Blockscout
- API Integration
- Tauri/Desktop App
