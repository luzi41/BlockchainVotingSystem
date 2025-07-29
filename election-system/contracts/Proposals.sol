// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

// V 0.23.3

import "./Registry.sol";

contract Proposals is Registry {
    uint public modus = 2;
    uint256 currentProposalId;
    string  publicKey;

    function getModus() public view returns (uint) {
        return modus;
    }    

    struct Proposal {
        uint256 uid;
        string name;
        string text;
        string url;
        uint qtype; // 1=Boolean
        string answer1;
        string answer2;
    }

    Proposal[] public proposals;

    struct EncryptedVote {
        string vote;
    }    

    EncryptedVote[] public encryptedVotes;

    struct VotingResult {
        string tally;
        string signature;
        uint timestamp;
        uint electionDistrict;
    }

    // Array to store decrypted results
    VotingResult[] public votingResults;
    event StoreVotingResult(address sender, uint electionDistrict, uint256 timestamp);    

    function getPublicKey() public view returns (string memory) {
        return publicKey;
    }

    function storePublicKey(string memory _publicKey) public Registry.onlyAdmin Registry.onlyBeforeVoting {
        publicKey = _publicKey;
    }

    function registerProposal(
        string memory _name, 
        string memory _text,
        string memory _url,
        uint _qtype,
        string memory _answer1,
        string memory _answer2
        ) 
        public Registry.onlyAdmin Registry.onlyBeforeVoting {
        currentProposalId++;
        proposals.push(Proposal({
            uid: currentProposalId,
            name: _name,  
            text: _text,
            url: _url,
            qtype: _qtype,
            answer1: _answer1,
            answer2: _answer2
        }));
    }

    function getProposals() public view returns (Proposal[] memory) {
        return proposals;
    }

    function castEncryptedVote(string memory _encryptedVote, string memory _token) public Registry.onlyDuringVoting {
        require(Registry.isTokenValid(_token, 1), "Invalid or used token");
        Registry.markTokenUsed(_token, 1);
        EncryptedVote memory encryptedVote;
        encryptedVote.vote = _encryptedVote;
        encryptedVotes.push(encryptedVote);
    }
        
    function getEncryptedVotes() public view Registry.onlyAfterVoting Registry.onlyAdmin returns (EncryptedVote[] memory) {
        return encryptedVotes;
    }

    function storeVotingResult(string memory _tally, string memory _signature, uint _wahlbezirk) public Registry.onlyAfterVoting Registry.onlyAdmin {
        VotingResult memory result;
        result.tally = _tally;
        result.signature = _signature;
        result.timestamp = block.timestamp;
        result.electionDistrict = _wahlbezirk;
        votingResults.push(result);
    }    
}