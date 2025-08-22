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
    "publicKeys":["-----BEGIN PUBLIC KEY-----...END PUBLIC KEY-----","-----BEGIN PUBLIC KEY-----...END PUBLIC KEY-----","-----BEGIN PUBLIC KEY-----...END PUBLIC KEY-----"]
}'

Please do not use the public key from this guide and choose a different key pair for each constituency (see 4.2).

## 5.3 Register parties

## 5.4 Register candidates

## 5.5 Store voting tokens



    
# 6 Start voting phase:

    curl -X POST http://localhost:3001/startVoting -H "Content-Type: application/json" -d '{"title" : "Test-Election 2025"}'

# 7 Install and start frontend-UI

Install: 

     cd frontend && $npm install

copy ABI to the frontend:

     cp  -R ../artifacts src/  

Start frontend:

     npm start
     
# 8 Test

- Open the React frontend in your browser (http://localhost:3002)
- Connect MetaMask
- goto /voteForm
- Select candidate & vote

## 8.1 Stop voting phase

    curl -X POST http://localhost:3001/endVoting

## 8.2 Counting the results

election-system/scripts$

    curl -X POST http://localhost:3001/storeElectionResult -H "Content-Type: application/json" -d '{"wahlbezirk" : "1"}' &&
    curl -X POST http://localhost:3001/storeElectionResult -H "Content-Type: application/json" -d '{"wahlbezirk" : "2"}' &&
    curl -X POST http://localhost:3001/storeElectionResult -H "Content-Type: application/json" -d '{"wahlbezirk" : "3"}'

## 8.3 See results 

- Navigate to http://localhost:3002/results (Browser app)
- or go to "Results" (Ergebnisse) (Desktop/Mobile app)
