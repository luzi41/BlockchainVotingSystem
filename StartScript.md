8. 🔄 Alles automatisch starten (Startscript)

Erstelle ein Shell-Skript start-all.sh:

    #!/bin/bash

#### 1. Quorum-Netzwerk starten
    
    mkdir election-system && 
    cd election-system &&
    npx quorum-dev-quickstart &&
    cd quorum-test-network && 
    ./run.sh &&

#### 2. Contract deployen
    cd ../election-system && npx hardhat run scripts/deploy.js --network quorum

#### 3. API starten
    cd api && node index.js &

#### 4. Frontend starten
    cd ../frontend && npm start

Ausführbar machen:

    chmod +x start-all.sh

Starten:

    ./start-all.sh

✅ Zusammenfassung

    Komponente	            Befehl / Zugriff
    -----------------------------------------------------------
    Netzwerk	            npm run start in quorum-dev-quickstart
    Contract Deploy	        npx hardhat run ...
    API	                    node api/index.js
    Frontend	            npm start im frontend/-Verzeichnis
    Ergebnisse	            http://localhost:3000/results
    Voting	                    http://localhost:3000/
