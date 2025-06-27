
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

// V 0.18.3

import "./Registry.sol";

contract Bundestagswahl is Registry {
    uint public modus = 1; // 1 Standard (Bundestagswahl); 2 Proposal Y/N etc: new SmartContracts 
    uint256 currentPartyId;

    struct ElectionDistrict {
        string name;
        uint nummer;
    }

    struct Party {
        uint256 uid;
        string name;
        string shortname;
    }

    struct Candidate {
        string name;
        uint wahlbezirk;
        string partei;
    }

    struct ElectionResult {
        string tally;
        string signature;
        uint timestamp;
        uint electionDistrict;
    }

    struct EncryptedVote {
        string vote1;
        string vote2;
        uint electionDistrict;
    }

    //array to store encrypted votes
    EncryptedVote[] public encryptedVotes;

    ElectionDistrict[] public electionDistricts;

    Party[] public parties;

    // Array to store candidates
    Candidate[] public candidates;

    // Array to store decrypted results
    ElectionResult[] public electionResults;

    // fkt. Wahlbezirke (ElectionDistricts)
    function getElectionDistricts() public view returns (ElectionDistrict[] memory){
        return electionDistricts;
    }

    function registerElectionDistrict(string memory _name, uint _nummer) public Registry.onlyAdmin Registry.onlyBeforeVoting {
        electionDistricts.push(ElectionDistrict({name: _name, nummer: _nummer}));
    }

    function getParties() public view returns (Party[] memory) {
        return parties;
    }

    function registerParty(string memory _name, string memory _shortname) public Registry.onlyAdmin Registry.onlyBeforeVoting {
        currentPartyId++;
        parties.push(Party({uid: currentPartyId, name: _name, shortname: _shortname}));
    }
  
    // fkt. Kandidaten
    function registerCandidate(string memory _name, uint _wahlbezirk, string memory _partei) public Registry.onlyAdmin Registry.onlyBeforeVoting {
        bool found = false;
        for (uint i = 0; i < electionDistricts.length; i++)
        {
            if (electionDistricts[i].nummer == _wahlbezirk) {
                candidates.push(Candidate({name: _name, wahlbezirk: _wahlbezirk, partei: _partei}));
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

        // Create a new array with the correct size
        EncryptedVote[] memory filteredEncryptedVotes = new EncryptedVote[](count);
        if (count == 0) {
            return new EncryptedVote[](0); // Return an empty array if no candidates found
        }
        
        uint index = 0;
        for (uint i = 0; i < encryptedVotes.length; i++) {
            if (encryptedVotes[i].electionDistrict == _wahlbezirk) {
                filteredEncryptedVotes[index] = encryptedVotes[i];
                index++;
            }
        }
        return filteredEncryptedVotes;
    }

    function storeElectionResult(string memory _tally, string memory _signature, uint _wahlbezirk) public Registry.onlyAfterVoting Registry.onlyAdmin {
        ElectionResult memory result;
        result.tally = _tally;
        result.signature = _signature;
        result.timestamp = block.timestamp;
        result.electionDistrict = _wahlbezirk;
        electionResults.push(result);
    }

    //fkt. public Client
    // Gibt nur den Datensatz für den letzten Bezirk zurück (alt)
    function getElectionResults() public view Registry.onlyAfterVoting returns (string memory tally, uint wahlbezirk, string memory signature, uint timestamp) {
        
        uint index = electionResults.length -1; // index letzter Datensatz im Array (fängt bei Null an!)

        ElectionResult storage result = electionResults[index];
        return (result.tally, result.electionDistrict, result.signature, result.timestamp);
    }

    // Neu: Gibt Datensatz für einen bestimmten Wahlbezirk zurück
    function getElectionResultsDistrict(uint _electionDistrict) public view Registry.onlyAfterVoting returns (string memory tally, uint wahlbezirk, string memory signature, uint timestamp) {
        uint count = 0;
        for (uint i = 0; i < electionResults.length; i++) {
            if (electionResults[i].electionDistrict == _electionDistrict) {
                count++;
                ElectionResult storage result = electionResults[i];
                return (result.tally, result.electionDistrict, result.signature, result.timestamp);
            }
        }
    }
}