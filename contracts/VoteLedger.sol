// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./ElectionRegistry.sol";

contract VoteLedger {
    struct Vote {
        bytes32 tokenHash;
        string encryptedVote; // e.g., Base64-encoded ciphertext
        uint256 timestamp;
    }

    ElectionRegistry public registry;
    address public admin;
    Vote[] public votes;

    constructor(address registryAddress) {
        registry = ElectionRegistry(registryAddress);
        admin = msg.sender;
    }

    function submitVote(bytes32 tokenHash, string memory encryptedVote) public {
        require(registry.isTokenValid(tokenHash), "Invalid or used token");
        votes.push(Vote({
            tokenHash: tokenHash,
            encryptedVote: encryptedVote,
            timestamp: block.timestamp
        }));
        registry.markTokenUsed(tokenHash);
    }

    function getVoteCount() public view returns (uint256) {
        return votes.length;
    }

    function getVote(uint256 index) public view returns (string memory, bytes32, uint256) {
        Vote memory v = votes[index];
        return (v.encryptedVote, v.tokenHash, v.timestamp);
    }
}
