// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract ElectionRegistry {
    mapping(bytes32 => bool) public registeredTokens;
    mapping(bytes32 => bool) public usedTokens;

    address public admin;

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin allowed");
        _;
    }

    function registerToken(bytes32 tokenHash) public onlyAdmin {
        require(!registeredTokens[tokenHash], "Token already registered");
        registeredTokens[tokenHash] = true;
    }

    function isTokenValid(bytes32 tokenHash) public view returns (bool) {
        return registeredTokens[tokenHash] && !usedTokens[tokenHash];
    }

    function markTokenUsed(bytes32 tokenHash) public onlyAdmin {
        require(registeredTokens[tokenHash], "Token not registered");
        require(!usedTokens[tokenHash], "Token already used");
        usedTokens[tokenHash] = true;
    }
}
