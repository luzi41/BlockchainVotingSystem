This part refers to a parliamentary election with two votes such as the federal election in Germany.
## 4 Backend API

### 4.1

Save the ABI in the election-system directory (replace filenames with your correct filenames) e.g.:

    cp artifacts/contracts/Registry.sol/Registry.json api/Registry.json &&
    cp artifacts/contracts/Bundestagswahl.sol/Bundestagswahl.json api/Bundestagswahl.json

### 4.2 Generate OpenSSL RSA private.pem and  public.pem

- Store private.pem in election-system/keys,
- The public key is stored in the smart contract via the API (see 5).

### 4.3 Install and start API

    cd api
    npm install express ethers node-forge // (once)
    node server.js

# 5 Enter election data to smart contract

The new version of the API makes it possible to manage multiple elections simultaneously.

## 5.1 Create a new election or poll

After you have started the API (see 4.3), open a new terminal and execute the following command:

    curl -X POST http://localhost:3001/createElection \
    -H "Content-Type: application/json" \
    -d '{"title":"[My election]"}'

Replace [My election] with the title of your election.

## 5.2 Data entry for the constituency structure

Enter the data for at least one constituency or electoral district (mandatory data: Election ID, constituency name, constituency number and constituency public key for vote encryption:
Assume electionId=1

    curl -X POST http://localhost:3001/1/registerElectionDistrictsBatch \
    -H "Content-Type: application/json" \
    -d '{
    "names":["Wahlkreis 1","Wahlkreis 2","Wahlkreis 3"],
    "nummern":[1,2,3],
    "publicKeys":["-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzySURgrOWXJv9H2bCvE2AgP0A9C5YqI4bATqaae6UxDsu0JajSx40m0Trg8zoJnYszvUSG/Z6/4sFvTvXuxb4F+kIjTQSHmkgjW1gYK/k55MddG0kjF/ZH8T0pXNCozTRmyp315vuPrB+0TDD+RPuK+HllSkZ+iPI3ddR6cGDNgKLMCUfJKvF91nrx/9ZBl3ZbW6Kla/5qO1BLURo1JShIq3K40khk+wwIkyPAeP0LLaPCw9RHyQzeFTevYN9zTYPvFuP2WDnlPXCefzzqA0XTxWcBGvMDH4qcXq86cPAPeuyiCrvrJWClHxgHlASLM50dLKxkI2XIvx8/Cd+glsiQIDAQAB-----END PUBLIC KEY-----","-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzySURgrOWXJv9H2bCvE2AgP0A9C5YqI4bATqaae6UxDsu0JajSx40m0Trg8zoJnYszvUSG/Z6/4sFvTvXuxb4F+kIjTQSHmkgjW1gYK/k55MddG0kjF/ZH8T0pXNCozTRmyp315vuPrB+0TDD+RPuK+HllSkZ+iPI3ddR6cGDNgKLMCUfJKvF91nrx/9ZBl3ZbW6Kla/5qO1BLURo1JShIq3K40khk+wwIkyPAeP0LLaPCw9RHyQzeFTevYN9zTYPvFuP2WDnlPXCefzzqA0XTxWcBGvMDH4qcXq86cPAPeuyiCrvrJWClHxgHlASLM50dLKxkI2XIvx8/Cd+glsiQIDAQAB-----END PUBLIC KEY-----","-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzySURgrOWXJv9H2bCvE2AgP0A9C5YqI4bATqaae6UxDsu0JajSx40m0Trg8zoJnYszvUSG/Z6/4sFvTvXuxb4F+kIjTQSHmkgjW1gYK/k55MddG0kjF/ZH8T0pXNCozTRmyp315vuPrB+0TDD+RPuK+HllSkZ+iPI3ddR6cGDNgKLMCUfJKvF91nrx/9ZBl3ZbW6Kla/5qO1BLURo1JShIq3K40khk+wwIkyPAeP0LLaPCw9RHyQzeFTevYN9zTYPvFuP2WDnlPXCefzzqA0XTxWcBGvMDH4qcXq86cPAPeuyiCrvrJWClHxgHlASLM50dLKxkI2XIvx8/Cd+glsiQIDAQAB-----END PUBLIC KEY-----"]
    }'

Please do not use the public key from this guide and choose a different key pair for each constituency (see 4.2).

## 5.3 Register parties

    curl -X POST http://localhost:3001/1/registerPartiesBatch \
    -H "Content-Type: application/json" \
    -d '{
        "names":["CDU","SPD","FDP","Grüne","Linke"],
        "shortnames":["CDU","SPD","FDP","GRUENE","LINKE"],
        "colors":["#fff","#fff","#8e44ad","#fff","#fff"],
        "bgcolors":["#000","#FF0000","#f1c40f","#27ae60","#c01c28"],
        "urls":["https://www.cdu.de","https://www.spd.de","https://www.fdp.de","https://www.gruene.de","https://www.die-linke.de"]
    }'


## 5.4 Register candidates

    curl -X POST http://localhost:3001/1/registerCandidatesBatch \
    -H "Content-Type: application/json" \
    -d '{
        "names":["Alice","Bob","Charly","Denise","Emily"],
        "wahlbezirke":[1,1,1,1,1],
        "parteien":["CDU","SPD","FDP","Grüne","Linke"],
        "urls":["https://.../alice","https://.../bob","https://.../charly","https://.../denise","https://.../emily"]
    }'


    curl -X POST http://localhost:3001/1/registerCandidatesBatch \
    -H "Content-Type: application/json" \
    -d '{
        "names":["Fritz","Gertud","Harry","Isolde","Jason"],
        "wahlbezirke":[2,2,2,2,2],
        "parteien":["CDU","SPD","FDP","Grüne","Linke"],
        "urls":["https://.../alice","https://.../bob","https://.../charly","https://.../denise","https://.../emily"]
    }'

    curl -X POST http://localhost:3001/1/registerCandidatesBatch \
    -H "Content-Type: application/json" \
    -d '{
        "names":["Karla","Ludwig","Mandy","Nele","Otto"],
        "wahlbezirke":[3,3,3,3,3],
        "parteien":["CDU","SPD","FDP","Grüne","Linke"],
        "urls":["https://.../Karla","https://.../Ludwig","https://.../Mandy","https://.../Nele","https://.../Otto"]
    }'

## 5.5 Store voting tokens

    curl -X POST http://localhost:3001/1/registerTokensBatch \
    -H "Content-Type: application/json" \
    -d '{
        "tokens":["SecretToken1","SecretToken2","SecretToken3","SecretToken4","SecretToken5","SecretToken6","SecretToken7","SecretToken8","SecretToken9","SecretToken10","SecretToken11","SecretToken12"],
        "electionDistricts":[1,1,1,1,2,2,2,2,3,3,3,3]
    }'
    
# 6 Start voting phase:

    curl -X POST http://localhost:3001/1/startVoting -H "Content-Type: application/json" -d '{}'

# 7 Install and start frontend-UI

## 7.1 Install: 

    cd election-system/nextFE/bvs 
    $npm install

## 7.2 copy ABI to the frontend:

    cp  -R ../../artifacts public/

## 7.3 compile Desktop-App (dev)

    cargo tauri dev

## 7.4 compile Desktop-App (prod)

    cargo tauri build

# 8 Running Desktop-App

    ./src-tauri/target/release/bundle/appimage/BVS_X.XX.XX_amd64.AppImage
     
# 9 Test

    npm run dev 

- Open the React frontend in your browser (http://localhost:3002)
- goto /voteForm
- Select candidate & vote

## 8.1 Stop voting phase

    curl -X POST http://localhost:3001/1/endVoting

## 8.2 Counting the results

    curl -X POST http://localhost:3001/1/storeElectionResult -H "Content-Type: application/json" -d '{"wahlbezirk" : "1"}' &&
    curl -X POST http://localhost:3001/1/storeElectionResult -H "Content-Type: application/json" -d '{"wahlbezirk" : "2"}' &&
    curl -X POST http://localhost:3001/1/storeElectionResult -H "Content-Type: application/json" -d '{"wahlbezirk" : "3"}'

## 8.3 See results 

- Navigate to http://localhost:3002/results (Browser app)
- or go to "Results" (Ergebnisse) (Desktop/Mobile app)
