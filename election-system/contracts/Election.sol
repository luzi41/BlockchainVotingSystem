// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

// V 0.7.1

contract Election {
    mapping(bytes32 => bool) public registeredTokens;
    mapping(bytes32 => bool) public usedTokens;

    address public admin;
    bool public votingOpen;
    bool public electionBegin;
    string public electionTitle;

    struct Candidate {
        string name;
        uint voteCount;
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
        require(electionBegin, unicode"Die Wahl ist schon geöffnet.");
        _;
    }    

    constructor() {
        admin = msg.sender;
    }
  
    function registerCandidate(string memory _name) public onlyAdmin onlyBeforeVoting {
        candidates.push(Candidate({name: _name, voteCount: 0}));
    }

    function registerToken(string memory _token) public onlyAdmin {
        
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

    function vote(uint _candidateIndex, string memory _token) public onlyDuringVoting {
        require(_candidateIndex < candidates.length, unicode"Ungültiger Kandidat.");
        require(isTokenValid(_token), "Invalid or used token");
        markTokenUsed(_token);
        candidates[_candidateIndex].voteCount += 1;
    }

    function getWinner() public view onlyAfterVoting returns (string memory winnerName, uint winnerVoteCount) {
        uint winningVoteCount = 0;
        uint winningIndex = 0;

        for (uint i = 0; i < candidates.length; i++) {
            
            if (candidates[i].voteCount > winningVoteCount) {
                winningVoteCount = candidates[i].voteCount;
                winningIndex = i;
            }

        }
        winnerName = candidates[winningIndex].name;
        winnerVoteCount = candidates[winningIndex].voteCount;
    }

    // Fehlt Wahlbezirk
    function getCandidates() public view returns (Candidate[] memory) {
        return candidates;
    }

    function getTotalVotes() public view onlyAfterVoting returns (uint totalVotes)
    {
        for (uint i = 0; i < candidates.length; i++) {

            totalVotes = totalVotes + candidates[i].voteCount;
        }
        return totalVotes;
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
