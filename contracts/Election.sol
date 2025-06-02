// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Election {
    address public admin;
    bool public votingOpen;

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
        require(msg.sender == admin, "Nur der Admin kann diese Funktion ausführen.");
        _;
    }

    modifier onlyDuringVoting() {
        require(votingOpen, "Die Wahl ist nicht geöffnet.");
        _;
    }

    modifier onlyAfterVoting() {
        require(!votingOpen, "Die Wahl ist noch geöffnet.");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function registerCandidate(string memory _name) public onlyAdmin {
        candidates.push(Candidate({name: _name, voteCount: 0}));
    }

    function registerVoter(address _voter) public onlyAdmin {
        require(!voters[_voter].registered, "Wähler ist bereits registriert.");
        voters[_voter] = Voter({registered: true, hasVoted: false});
    }

    function startVoting() public onlyAdmin {
        require(candidates.length >= 2, "Mindestens zwei Kandidaten erforderlich.");
        votingOpen = true;
    }

    function endVoting() public onlyAdmin {
        votingOpen = false;
    }

    function vote(uint _candidateIndex) public onlyDuringVoting {
        Voter storage sender = voters[msg.sender];
        require(sender.registered, "Nicht registrierter Wähler.");
        require(!sender.hasVoted, "Wähler hat bereits abgestimmt.");
        require(_candidateIndex < candidates.length, "Ungültiger Kandidat.");

        sender.hasVoted = true;
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

    function getCandidates() public view returns (Candidate[] memory) {
        return candidates;
    }
}
