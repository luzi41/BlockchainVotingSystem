// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "./Registry.sol";

contract Proposals is Registry {
    uint public modus = 2; // 2 = Proposals-Modus
    uint256 private currentProposalId;

    // PublicKey je Wahl
    mapping(uint => string) public publicKeys;

    // Proposal-Daten
    struct Proposal {
        uint256 uid;
        string name;
        string text;
        string url;
        uint qtype; // 1=Boolean, 2=MultipleChoice, etc.
        string answer1;
        string answer2;
    }

    // Input-Struct für Batch (vermeidet „stack too deep“)
    struct ProposalInput {
        string name;
        string text;
        string url;
        uint qtype;
        string answer1;
        string answer2;
    }

    // Storage
    mapping(uint => Proposal[]) private _proposals;            // electionId => proposals
    struct EncryptedVote { string vote; }
    mapping(uint => EncryptedVote[]) private _encryptedVotes;  // electionId => votes
    mapping(uint => uint256) private _voteCounts;              // electionId => count

    struct VotingResult {
        string tally;
        string signature;
        uint timestamp;
        uint electionDistrict;
    }
    mapping(uint => mapping(uint => VotingResult[])) private _votingResults; // electionId => district => results[]

    // Events
    event ProposalCreated(uint indexed electionId, uint indexed proposalId, string name);
    event StoreVotingResult(address indexed sender, uint indexed electionId, uint indexed electionDistrict, uint256 timestamp);

    // --- Modus
    function getModus() external view returns (uint) {
        return modus;
    }

    // --- PublicKey je Wahl
    function getPublicKey(uint electionId) external view returns (string memory) {
        return publicKeys[electionId];
    }

    function storePublicKey(uint electionId, string calldata _publicKey)
        external
        Registry.onlyAdmin
        Registry.onlyBeforeVoting(electionId)
    {
        publicKeys[electionId] = _publicKey;
    }

    // --- Proposal-Registrierung (Single)
    function registerProposal(uint electionId, ProposalInput calldata p)
        external
        Registry.onlyAdmin
        Registry.onlyBeforeVoting(electionId)
    {
        currentProposalId++;
        Proposal[] storage arr = _proposals[electionId];
        arr.push();
        Proposal storage slot = arr[arr.length - 1];
        slot.uid      = currentProposalId;
        slot.name     = p.name;
        slot.text     = p.text;
        slot.url      = p.url;
        slot.qtype    = p.qtype;
        slot.answer1  = p.answer1;
        slot.answer2  = p.answer2;

        emit ProposalCreated(electionId, currentProposalId, p.name);
    }

    // --- Proposal-Registrierung (Batch) – stack-sicher via Struct-Array
    function registerProposalsBatch(uint electionId, ProposalInput[] calldata items)
        external
        Registry.onlyAdmin
        Registry.onlyBeforeVoting(electionId)
    {
        Proposal[] storage arr = _proposals[electionId];
        uint len = items.length;
        for (uint i = 0; i < len; i++) {
            currentProposalId++;
            arr.push();
            Proposal storage slot = arr[arr.length - 1];
            slot.uid      = currentProposalId;
            slot.name     = items[i].name;
            slot.text     = items[i].text;
            slot.url      = items[i].url;
            slot.qtype    = items[i].qtype;
            slot.answer1  = items[i].answer1;
            slot.answer2  = items[i].answer2;

            emit ProposalCreated(electionId, currentProposalId, items[i].name);
        }
    }

    function getProposals(uint electionId) external view returns (Proposal[] memory) {
        return _proposals[electionId];
    }

    // --- Voting
    function castEncryptedVote(uint electionId, string calldata _encryptedVote, string calldata _token, uint district)
        external
        Registry.onlyDuringVoting(electionId)
    {
        require(Registry.isTokenValid(electionId, _token, district), "Invalid or used token");
        Registry.markTokenUsed(electionId, _token, district);
        _voteCounts[electionId]++;

        _encryptedVotes[electionId].push(EncryptedVote({ vote: _encryptedVote }));
    }

    function getNumberOfVotes(uint electionId)
        external
        view
        Registry.onlyAfterVoting(electionId)
        returns (uint256)
    {
        return _voteCounts[electionId];
    }

    function getEncryptedVotes(uint electionId)
        external
        view
        Registry.onlyAfterVoting(electionId)
        Registry.onlyAdmin
        returns (EncryptedVote[] memory)
    {
        return _encryptedVotes[electionId];
    }

    // --- Ergebnisse
    function storeVotingResult(uint electionId, string calldata _tally, string calldata _signature, uint _wahlbezirk)
        external
        Registry.onlyAfterVoting(electionId)
        Registry.onlyAdmin
    {
        _votingResults[electionId][_wahlbezirk].push(
            VotingResult({
                tally: _tally,
                signature: _signature,
                timestamp: block.timestamp,
                electionDistrict: _wahlbezirk
            })
        );
        emit StoreVotingResult(msg.sender, electionId, _wahlbezirk, block.timestamp);
    }

    function getVotingResults(uint electionId, uint _wahlbezirk)
        external
        view
        Registry.onlyAfterVoting(electionId)
        returns (VotingResult[] memory)
    {
        return _votingResults[electionId][_wahlbezirk];
    }
}
