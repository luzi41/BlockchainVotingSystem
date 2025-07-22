
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

// V 0.22.3

import "./Registry.sol";

contract Bundestagswahl is Registry {
    uint public modus = 1; // 1 Standard (Bundestagswahl); 2 Proposal Y/N etc: new SmartContracts 
    uint256 currentPartyId;
    uint256 currentCandidateId;

    function getModus() public view returns (uint) {
        return modus;
    }

    struct ElectionDistrict {
        string name;
        uint nummer;
        string publicKey;
    }

    ElectionDistrict[] public electionDistricts;
    event ElectionDistrictCreated(string name, uint _electionDistrict);    

    struct Party {
        uint256 uid;
        string name;
        string shortname;
        string color;
        string bgcolor;
        string url;
        uint256 votes;
    }

    Party[] public parties;
    event PartyCreated(uint256 uid, string name, string shortname);

    struct Candidate {
        uint256 uid;
        string name;
        uint wahlbezirk;
        string partei;
        string url;
        uint256 votes;
    }
    // Array to store candidates
    Candidate[] public candidates;
    event CandidateCreated(uint256 uid, string name, uint wahlbezirk);    
 

    struct EncryptedVote {
        string vote1;
        string vote2;
        uint electionDistrict;
    }

    //array to store encrypted votes
    EncryptedVote[] public encryptedVotes;

    struct ElectionResult1 {
        string tally;
        string signature;
        uint timestamp;
        uint electionDistrict;
    }

    struct ElectionResult2 {
        string tally;
        string signature;
        uint timestamp;
        uint electionDistrict;
    }       

    // Arrays to store decrypted results
    ElectionResult1[] public electionResults1;
    ElectionResult2[] public electionResults2;

    event StoreElectionResult1(address sender, uint electionDistrict, uint256 timestamp);
    event StoreElectionResult2(address sender, uint electionDistrict, uint256 timestamp);

    // fkt. Wahlbezirke (ElectionDistricts)
    function getElectionDistricts() public view returns (ElectionDistrict[] memory){
        return electionDistricts;
    }

    function getElectionDistrictByNumber(uint _number) public view returns (ElectionDistrict memory){
        for (uint i = 0; i < electionDistricts.length; i++) {
            if (electionDistricts[i].nummer == _number) return electionDistricts[i];
        }
        revert("No election district with the given number found");
    }

    function registerElectionDistrict(string memory _name, uint _nummer, string memory _publicKey) public Registry.onlyAdmin Registry.onlyBeforeVoting {
        electionDistricts.push(ElectionDistrict({name: _name, nummer: _nummer, publicKey: _publicKey}));
        emit ElectionDistrictCreated(_name, _nummer);
    }

    function getParties() public view returns (Party[] memory) {
        return parties;
    }

    function registerParty(
        string memory _name, 
        string memory _shortname,
        string memory _color,
        string memory _bgcolor,
        string memory _url

        ) public Registry.onlyAdmin Registry.onlyBeforeVoting {

        currentPartyId++;
        parties.push(Party({
            uid: currentPartyId, 
            name: _name, 
            shortname: _shortname,
            color: _color,
            bgcolor: _bgcolor,
            url: _url,
            votes: 0
            }));
    }
  
    // fkt. Kandidaten
    function registerCandidate(
        string memory _name, 
        uint _wahlbezirk, 
        string memory _partei,
        string memory _url
        ) 
        public Registry.onlyAdmin Registry.onlyBeforeVoting {

        bool found = false;
        for (uint i = 0; i < electionDistricts.length; i++)
        {
            if (electionDistricts[i].nummer == _wahlbezirk) {
                currentCandidateId++;
                candidates.push(Candidate({
                    uid: currentCandidateId,
                    name: _name, 
                    wahlbezirk: _wahlbezirk, 
                    partei: _partei,
                    url: _url,
                    votes: 0
                }));

                found = true;
                break;
            }
        }
        if (!found) {
            revert(unicode"Kein gültiger Wahlbezirk!");
        }
        
    }

    function getCandidates(uint _wahlbezirk) public view returns (Candidate[] memory) {
        // First, count how many candidates match the wahlbezirk
        uint count = 0;
        for (uint i = 0; i < candidates.length; i++) {
            if (candidates[i].wahlbezirk == _wahlbezirk) {
                count++;
            }
        }

        // Create a new array with the correct size
        Candidate[] memory filteredCandidates = new Candidate[](count);
        if (count == 0) {
            return new Candidate[](0); // Return an empty array if no candidates found
        }

        uint index = 0;
        for (uint i = 0; i < candidates.length; i++) {
            if (candidates[i].wahlbezirk == _wahlbezirk) {
                filteredCandidates[index] = candidates[i];
                index++;
            }
        }
        return filteredCandidates;
    }

    function castEncryptedVote(string memory _encryptedVote1, string memory _encryptedVote2, string memory _token, uint _wahlbezirk) public Registry.onlyDuringVoting {
        require(Registry.isTokenValid(_token, _wahlbezirk), "Invalid or used token");
        Registry.markTokenUsed(_token, _wahlbezirk);
        EncryptedVote memory encryptedVote;
        encryptedVote.vote1 = _encryptedVote1;
        encryptedVote.vote2 = _encryptedVote2;
        encryptedVote.electionDistrict = _wahlbezirk;
        encryptedVotes.push(encryptedVote);
    }

    function getEncryptedVotes(uint _wahlbezirk) public view Registry.onlyAfterVoting Registry.onlyAdmin returns (EncryptedVote[] memory) {

        // First, count how many votes match the wahlbezirk
        uint count = 0;
        for (uint i = 0; i < encryptedVotes.length; i++) {
            if (encryptedVotes[i].electionDistrict == _wahlbezirk) {
                count++;
            }
        }
        if (count == 0) {
            return new EncryptedVote[](0); // Return an empty array if no candidates found
        }
        // Create a new array with the correct size
        EncryptedVote[] memory filteredEncryptedVotes = new EncryptedVote[](count);

        uint index = 0;
        for (uint i = 0; i < encryptedVotes.length; i++) {
            if (encryptedVotes[i].electionDistrict == _wahlbezirk) {
                filteredEncryptedVotes[index] = encryptedVotes[i];
                index++;
            }
        }
        return filteredEncryptedVotes;
    }

    function storeElectionResult1(string memory _tally, string memory _signature, uint _wahlbezirk) public Registry.onlyAfterVoting Registry.onlyAdmin {
        ElectionResult1 memory result;
        result.tally = _tally;
        result.signature = _signature;
        result.timestamp = block.timestamp;
        result.electionDistrict = _wahlbezirk;
        electionResults1.push(result);
    }

    function storeElectionResult2(string memory _tally, string memory _signature, uint _wahlbezirk) public Registry.onlyAfterVoting Registry.onlyAdmin {
        ElectionResult2 memory result;
        result.tally = _tally;
        result.signature = _signature;
        result.timestamp = block.timestamp;
        result.electionDistrict = _wahlbezirk;
        electionResults2.push(result);
    }

    // Neu: Gibt Datensatz Erststimmen für einen bestimmten Wahlbezirk zurück
    function getElectionResultsDistrict1(uint _electionDistrict) public view Registry.onlyAfterVoting returns (string memory tally, uint wahlbezirk, string memory signature, uint timestamp) {
        
        for (uint i = 0; i < electionResults1.length; i++) {
            if (electionResults1[i].electionDistrict == _electionDistrict) {
                
                ElectionResult1 storage result = electionResults1[i];
                return (result.tally, result.electionDistrict, result.signature, result.timestamp);
            }
        }
    }

    // Neu: Gibt Datensatz Zweitstimmen für einen bestimmten Wahlbezirk zurück
    function getElectionResultsDistrict2(uint _electionDistrict) public view Registry.onlyAfterVoting returns (string memory tally, uint wahlbezirk, string memory signature, uint timestamp) {
        
        for (uint i = 0; i < electionResults2.length; i++) {
            if (electionResults2[i].electionDistrict == _electionDistrict) {
                
                ElectionResult2 storage result = electionResults2[i];
                return (result.tally, result.electionDistrict, result.signature, result.timestamp);
            }
        }
    }
}