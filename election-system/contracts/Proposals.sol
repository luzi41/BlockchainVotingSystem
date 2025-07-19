// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

// V 0.21.9

import "./Registry.sol";

contract Proposals {
    uint public modus = 2;

    struct Proposal {
        uint256 uid;
        string name;
        string url;
    }

    struct Answer {
        uint256 uid;
        uint256 proposal;
        bool yes;

    }
}