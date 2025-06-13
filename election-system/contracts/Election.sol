// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

// V 0.9.0

contract Election {
    mapping(bytes32 => bool) public registeredTokens;
    mapping(bytes32 => bool) public usedTokens;

    string[] public encryptedVotes;

    address public admin;
    bool public votingOpen;
    bool public electionBegin;
    string public electionTitle;
    string public aggregatedVotes;

    struct Candidate {
        string name;
        uint wahlbezirk;
        string partei;
    }

    struct Voter {
        bool registered;
        bool hasVoted;
    }

    Candidate[] public candidates;

    mapping(address => Voter) public voters;

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

    function castEncryptedVote(string memory encryptedVote, string memory _token) public onlyDuringVoting {
        require(isTokenValid(_token), "Invalid or used token");
        markTokenUsed(_token);
        encryptedVotes.push(encryptedVote);
    }

    function getEncryptedVotes() public view onlyAfterVoting returns (string[] memory) {
        return encryptedVotes;
    }

    function storeAggregatedVotes(string memory _aggregatedVotes) public onlyAdmin onlyAfterVoting {
        aggregatedVotes = _aggregatedVotes;
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
