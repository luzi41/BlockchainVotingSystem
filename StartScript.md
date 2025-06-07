# Vorausetzungen

    Node.js (LTS)
    
    npm 
    
    Git
    
    Docker & Docker Compose
    
    MetaMask Browser Extension

# Repository klonen
    
    git clone https://github.com/luzi41/BlockchainVotingSystem.git

# Erstelle ein Shell-Skript start-all.sh: (noch nicht fertig)

    #!/bin/bash
     
    cd election-system &&
    npx quorum-dev-quickstart &&
    cd quorum-test-network && 
    ./run.sh &

    cd .. && npx hardhat run scripts/deploy.js --network quorum &
    cd api && npm install express ethers &&
    node index.js &

    cd ../frontend && npm start &&

    curl -X POST http://localhost:3001/registerCandidate -H "Content-Type: application/json" -d '{"name": "Alice"}' &&

    curl -X POST http://localhost:3001/registerCandidate -H "Content-Type: application/json" -d '{"name": "Bob"}' &&

    curl -X POST http://localhost:3001/registerVoter -H "Content-Type: application/json" -d '{"voterAddress": $1"}' &&
    curl -X POST http://localhost:3001/registerVoter -H "Content-Type: application/json" -d '{"voterAddress": $2"}' &&
    curl -X POST http://localhost:3001/registerVoter -H "Content-Type: application/json" -d '{"voterAddress": $3"}' &&

    curl -X POST http://localhost:3001/startVoting
    
# Ausführbar machen:

    chmod +x start-all.sh

# Wahl starten:

    ./start-all.sh {voter adddess 1} {voter adddess 2} {voter adddess 3}

    http://localhost:3002/vote

# Wahl beenden

    curl -X POST http://localhost:3001/endVoting

    http://localhost:3002/results
    

✅ Zusammenfassung

    Komponente	            Befehl / Zugriff
    -----------------------------------------------------------
    Netzwerk	            npx in quorum-dev-quickstart
    Contract Deploy	        npx hardhat run ...
    API	                    node api/index.js
    Frontend	            npm start im frontend/-Verzeichnis
    Ergebnisse	            http://localhost:3002/results
    Voting	                http://localhost:3002/
