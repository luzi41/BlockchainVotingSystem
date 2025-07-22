// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

// V 0.22.3

import "./Registry.sol";

contract Proposals is Registry {
    uint public modus = 2;
    uint256 currentProposalId;
    string  publicKey;

    struct Proposal {
        uint256 uid;
        string name;
        string text;
        string url;
    }

    Proposal[] public proposals;

    struct Answer {
        uint256 uid;
        uint256 proposal;
        string qtype;

    }

    Answer[] public answers;

    struct EncryptedVote {
        string vote;
    }    

    EncryptedVote[] public encryptedVotes;

    function getPublicKey() public view returns (string memory) {
        return publicKey;
    }

    function storePublicKey(string memory _publicKey) public Registry.onlyAdmin Registry.onlyBeforeVoting {
        publicKey = _publicKey;
    }

    function registerProposal(
        string memory _name, 
        string memory _text,
        string memory _url
        ) 
        public Registry.onlyAdmin Registry.onlyBeforeVoting {
        currentProposalId++;
        proposals.push(Proposal({
            uid: currentProposalId,
            name: _name,  
            text: _text,
            url: _url
        }));
    }

    function registerAnswer(string memory _qtype, uint256 _proposal) public Registry.onlyAdmin Registry.onlyBeforeVoting {
        Answer memory answer;
        answer.qtype = _qtype;
        answer.proposal = _proposal;
        answers.push(answer);
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

}