#!/bin/bash

set -e

# Farben
GREEN='\033[0;32m'
NC='\033[0m' # keine Farbe

echo -e "${GREEN}1. Starte Quorum-Testnetz...${NC}"
cd quorum-dev-quickstart
npm install
npm run build
npm run start &

# Warte auf Netzstart
sleep 10

cd quorum-test-network
./run.sh &
cd ../..

# Hardhat vorbereiten
echo -e "${GREEN}2. Bereite Hardhat vor...${NC}"
cd contracts
npm install
cd ..

# Deployment
echo -e "${GREEN}3. Deploye Smart Contract...${NC}"
node scripts/deployContract.js

# Update Config für API und Frontend
echo -e "${GREEN}4. Update Config für API & Frontend...${NC}"
node scripts/updateConfig.js

# API starten
echo -e "${GREEN}5. Starte API...${NC}"
cd api
npm install
npm start &

# Frontend starten
echo -e "${GREEN}6. Starte Frontend...${NC}"
cd ../frontend
npm install
npm start &

echo -e "${GREEN}✅ Wahlplattform läuft. API: http://localhost:3001 | Frontend: http://localhost:3002${NC}"