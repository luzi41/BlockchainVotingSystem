// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Tally {
    address public admin;

    string public results;
    uint256 public submittedAt;

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can submit results");
        _;
    }

    function submitResults(string memory resultJson) public onlyAdmin {
        require(submittedAt == 0, "Results already submitted");
        results = resultJson;
        submittedAt = block.timestamp;
    }

    function getResults() public view returns (string memory, uint256) {
        return (results, submittedAt);
    }
}
