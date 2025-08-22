// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

// V 0.24.9 Multi-Election Bundestagswahl

import "./Registry.sol";

contract Bundestagswahl is Registry {

    struct ElectionDistrict {
        string name;
        uint nummer;
        string publicKey;
    }

    struct Party {
        uint256 uid;
        string name;
        string shortname;
        string color;
        string bgcolor;
        string url;
        uint256 votes;
    }

    struct Candidate {
        uint256 uid;
        string name;
        uint wahlbezirk;
        string partei;
        string url;
        uint256 votes;
    }

    struct EncryptedVote {
        string vote1;
        string vote2;
        uint electionDistrict;
    }

    struct ElectionResult {
        string tally;
        string signature;
        uint timestamp;
        uint electionDistrict;
    }

    // Wichtige Mappings pro Wahl
    mapping(uint => ElectionDistrict[]) public electionDistricts;
    mapping(uint => Party[]) public parties;
    mapping(uint => Candidate[]) public candidates;
    mapping(uint => EncryptedVote[]) public encryptedVotes;
    mapping(uint => ElectionResult[]) public electionResults1;
    mapping(uint => ElectionResult[]) public electionResults2;

    uint256 public currentPartyId;
    uint256 public currentCandidateId;

    // --- ElectionDistricts ---
    function registerElectionDistrict(uint electionId, string memory _name, uint _nummer, string memory _publicKey) 
        public onlyAdmin onlyBeforeVoting(electionId) 
    {
        electionDistricts[electionId].push(ElectionDistrict({name: _name, nummer: _nummer, publicKey: _publicKey}));
    }

    function getElectionDistricts(uint electionId) public view returns (ElectionDistrict[] memory) {
        return electionDistricts[electionId];
    }

    // --- Parties ---
    function registerParty(uint electionId, string memory _name, string memory _shortname, string memory _color, string memory _bgcolor, string memory _url) 
        public onlyAdmin onlyBeforeVoting(electionId) 
    {
        currentPartyId++;
        parties[electionId].push(Party({
            uid: currentPartyId,
            name: _name,
            shortname: _shortname,
            color: _color,
            bgcolor: _bgcolor,
            url: _url,
            votes: 0
        }));
    }

    function getParties(uint electionId) public view returns (Party[] memory) {
        return parties[electionId];
    }

    // --- Candidates ---
    function registerCandidate(uint electionId, string memory _name, uint _wahlbezirk, string memory _partei, string memory _url) 
        public onlyAdmin onlyBeforeVoting(electionId) 
    {
        Candidate[] storage cands = candidates[electionId];
        ElectionDistrict[] storage districts = electionDistricts[electionId];

        bool found = false;
        for (uint i = 0; i < districts.length; i++) {
            if (districts[i].nummer == _wahlbezirk) {
                currentCandidateId++;
                cands.push(Candidate({
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
        if (!found) revert(unicode"Kein gültiger Wahlbezirk!");
    }

    function getCandidates(uint electionId, uint _wahlbezirk) public view returns (Candidate[] memory) {
        Candidate[] storage allCandidates = candidates[electionId];
        uint count = 0;
        for (uint i = 0; i < allCandidates.length; i++) {
            if (allCandidates[i].wahlbezirk == _wahlbezirk) count++;
        }
        Candidate[] memory filtered = new Candidate[](count);
        uint index = 0;
        for (uint i = 0; i < allCandidates.length; i++) {
            if (allCandidates[i].wahlbezirk == _wahlbezirk) {
                filtered[index++] = allCandidates[i];
            }
        }
        return filtered;
    }

    // --- Votes ---
    function castEncryptedVote(uint electionId, string memory _encryptedVote1, string memory _encryptedVote2, string memory _token, uint _wahlbezirk) 
        public onlyDuringVoting(electionId) 
    {
        require(isTokenValid(electionId, _token, _wahlbezirk), "Invalid or used token");
        markTokenUsed(electionId, _token, _wahlbezirk);
        encryptedVotes[electionId].push(EncryptedVote({vote1: _encryptedVote1, vote2: _encryptedVote2, electionDistrict: _wahlbezirk}));
    }

    function getEncryptedVotes(uint electionId, uint _wahlbezirk) public view onlyAfterVoting(electionId) onlyAdmin returns (EncryptedVote[] memory) {
        EncryptedVote[] storage votes = encryptedVotes[electionId];
        uint count = 0;
        for (uint i = 0; i < votes.length; i++) {
            if (votes[i].electionDistrict == _wahlbezirk) count++;
        }
        EncryptedVote[] memory filtered = new EncryptedVote[](count);
        uint index = 0;
        for (uint i = 0; i < votes.length; i++) {
            if (votes[i].electionDistrict == _wahlbezirk) filtered[index++] = votes[i];
        }
        return filtered;
    }

    // --- Results ---
    function storeElectionResult1(uint electionId, string memory _tally, string memory _signature, uint _wahlbezirk) 
        public onlyAfterVoting(electionId) onlyAdmin 
    {
        electionResults1[electionId].push(ElectionResult({tally: _tally, signature: _signature, timestamp: block.timestamp, electionDistrict: _wahlbezirk}));
    }

    function storeElectionResult2(uint electionId, string memory _tally, string memory _signature, uint _wahlbezirk) 
        public onlyAfterVoting(electionId) onlyAdmin 
    {
        electionResults2[electionId].push(ElectionResult({tally: _tally, signature: _signature, timestamp: block.timestamp, electionDistrict: _wahlbezirk}));
    }

    function getElectionResultsDistrict1(uint electionId, uint _electionDistrict) public view onlyAfterVoting(electionId) returns (string memory, uint, string memory, uint) {
        ElectionResult[] storage results = electionResults1[electionId];
        for (uint i = 0; i < results.length; i++) {
            if (results[i].electionDistrict == _electionDistrict) {
                return (results[i].tally, results[i].electionDistrict, results[i].signature, results[i].timestamp);
            }
        }
    }

    function getElectionResultsDistrict2(uint electionId, uint _electionDistrict) public view onlyAfterVoting(electionId) returns (string memory, uint, string memory, uint) {
        ElectionResult[] storage results = electionResults2[electionId];
        for (uint i = 0; i < results.length; i++) {
            if (results[i].electionDistrict == _electionDistrict) {
                return (results[i].tally, results[i].electionDistrict, results[i].signature, results[i].timestamp);
            }
        }
    }
}
