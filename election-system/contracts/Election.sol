// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

// V 0.14

contract Election {
    mapping(bytes32 => bool) public registeredTokens;
    mapping(bytes32 => bool) public usedTokens;

    address public admin;
    bool public votingOpen;
    bool public electionBegin;
    string public electionTitle;

    struct Candidate {
        string name;
        uint wahlbezirk;
        string partei;
    }

    struct Voter {
        bool registered;
        bool hasVoted;
    }

    struct ElectionResult {
        string tally;
        string signature;
        uint timestamp;
        uint wahlbezirk;
    }

    struct EncryptedVote {
        string vote;
        uint wahlbezirk;
    }

    EncryptedVote[] public encryptedVotes;

    // Array to store candidates
    Candidate[] public candidates;

    ElectionResult[] public electionResults;

    // wird nicht mehr gebraucht: mapping(address => Voter) public voters;

    modifier onlyAdmin() {
        require(msg.sender == admin, unicode"Nur der Admin kann diese Funktion ausführen!");
        _;
    }

    modifier onlyDuringVoting() {
        require(votingOpen, unicode"Die Wahl ist nicht geöffnet.");
        _;
    }

    modifier onlyAfterVoting() {
        require(!votingOpen, unicode"Die Wahl ist noch geöffnet.");
        _;
    }

    modifier onlyBeforeVoting() {
        require(!electionBegin, unicode"Die Wahl ist schon geöffnet.");
        _;
    }    

    constructor() {
        admin = msg.sender;
    }
  
    function registerCandidate(string memory _name, uint _wahlbezirk, string memory _partei) public onlyAdmin onlyBeforeVoting {
        candidates.push(Candidate({name: _name, wahlbezirk: _wahlbezirk, partei: _partei}));
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

    function registerToken(string memory _token) public onlyAdmin onlyBeforeVoting  {
        
        require(!registeredTokens[keccak256(abi.encodePacked(_token))], "Token already registered");
        registeredTokens[keccak256(abi.encodePacked(_token))] = true;
    }

    function isTokenValid(string memory _token) public view returns (bool) {
        return registeredTokens[keccak256(abi.encodePacked(_token))] && !usedTokens[keccak256(abi.encodePacked(_token))];
    }

    function markTokenUsed(string memory _token) public {
        require(registeredTokens[keccak256(abi.encodePacked(_token))], "Token not registered");
        require(!usedTokens[keccak256(abi.encodePacked(_token))], "Token already used");
        usedTokens[keccak256(abi.encodePacked(_token))] = true;
    }

    function startVoting(string memory _electionTitle) public onlyAdmin {
        require(candidates.length >= 2, "Mindestens zwei Kandidaten erforderlich.");
        votingOpen = true;
        electionBegin = true;
        electionTitle = _electionTitle;
    }

    function endVoting() public onlyAdmin {
        votingOpen = false;
    }

    function castEncryptedVote(string memory _encryptedVote, string memory _token, uint _wahlbezirk) public onlyDuringVoting {
        require(isTokenValid(_token), "Invalid or used token");
        markTokenUsed(_token);
        EncryptedVote memory encryptedVote;
        encryptedVote.vote = _encryptedVote;
        encryptedVote.wahlbezirk = _wahlbezirk;
        encryptedVotes.push(encryptedVote);
    }

    function getEncryptedVotes(uint _wahlbezirk) public view onlyAfterVoting returns (EncryptedVote[] memory) {

        // First, count how many votes match the wahlbezirk
        uint count = 0;
        for (uint i = 0; i < encryptedVotes.length; i++) {
            if (encryptedVotes[i].wahlbezirk == _wahlbezirk) {
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
            if (encryptedVotes[i].wahlbezirk == _wahlbezirk) {
                filteredEncryptedVotes[index] = encryptedVotes[i];
                index++;
            }
        }
        return filteredEncryptedVotes;
    }

    function storeElectionResult(string memory _tally, string memory _signature, uint _wahlbezirk) public onlyAfterVoting {
        ElectionResult memory result;
        result.tally = _tally;
        result.signature = _signature;
        result.timestamp = block.timestamp;
        result.wahlbezirk = _wahlbezirk;
        electionResults.push(result);
    }

    function getElectionResults() public view returns (string memory tally, uint wahlbezirk, string memory signature, uint timestamp) {
        
        uint index = electionResults.length -1;

        ElectionResult storage result = electionResults[index];
        return (result.tally, result.wahlbezirk, result.signature, result.timestamp);
    }

    function getElectionStatus() public view returns (string memory status)
    {
        if (electionBegin == true)
        {
            if (votingOpen == true)
            {
                return status = unicode"Die Wahl ist geöffnet.";
            }
            else {
                return status = unicode"Die Wahl ist geschlossen.";
            }

        }
        else {
            return status = unicode"Die Wahl hat noch nicht begonnen.";
        }
    }

    function getElectionTitle() public view returns (string memory title)
    {
        return title = electionTitle;
    }
}
