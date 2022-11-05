// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.0;

contract Election {
  // Election details will be stored in these variables
  string public name;
  string public description;

  struct Voter {
    uint weight; // weight is accumulated by delegation
    bool voted;  // if true, that person already voted
    address delegate; // person delegated to
    uint vote;   // index of the voted proposal
  }

  // Structure of candidate standing in the election
  struct Candidate {
    uint256 id;
    string name;
    uint256 voteCount;
  }

  // Storing candidates in a map
  mapping(uint256 => Candidate) public candidates;

  address public chairperson;

  // Storing address of those voters who already voted
  // mapping(address => bool) public voters;
  mapping(address => Voter) public voters;

  // Number of candidates in standing in the election
  uint256 public candidatesCount = 0;

  // Setting of variables and data, during the creation of election contract
  constructor(string[] memory _nda, string[] memory _candidates)  {
    require(_candidates.length > 0, "There should be atleast 1 candidate.");
    name = _nda[0];
    description = _nda[1];
    chairperson = tx.origin; 
    voters[chairperson].weight = 1; // Voter chairperson gets right to vote    
    for (uint256 i = 0; i < _candidates.length; i++) {
      addCandidate(_candidates[i]);
    }
  }

  // Private function to add a candidate
  function addCandidate(string memory _name) private {
    candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    candidatesCount++;
  }

  /** 
  * @dev Give 'voter' the right to vote on this ballot. May only be called by 'chairperson'.
  * @param voter address of voter
  */
  function giveRightToVote(address voter) public {
    require(
        msg.sender == chairperson,
        "Only chairperson can give right to vote."
    );
    require(
        !voters[voter].voted,
        "The voter already voted."
    );
    require(voters[voter].weight == 0);
    voters[voter].weight = 1;
  }

  /**
   * @dev Self registering for voters
   */
  function register() public {
    voters[tx.origin].weight = 1;
  }

  // Public vote function for voting a candidate
  function vote(uint256 _candidate) public {

    Voter storage sender = voters[msg.sender];
    
    // Prüfung, ob in Online-Wählerverzeichnis enthalten
    // verifyVoter(msg.sender);
    require(sender.weight > 0, "Voter has no right to vote");

    require(!sender.voted, "Voter has already voted!"); // Hat noch nicht gewählt
    require(
      _candidate < candidatesCount && _candidate >= 0, // "Gültiger Kandidat"
      "Invalid candidate to Vote!"
    );

    sender.voted = true; // Wähler hat gewählt
    sender.weight = sender.weight - 1;
    candidates[_candidate].voteCount++;
  }
}
