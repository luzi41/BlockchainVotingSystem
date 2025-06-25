// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

// V 0.16.4

contract Registry {

    address public admin;
    bool public votingOpen;
    bool public electionBegin;
    string public electionTitle;

    struct Token {
        bytes32 token;
        uint electionDistrict;
        bool usedToken;
    }

    // Array to store token
    Token[] tokens;

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
        require(!electionBegin, unicode"Die Wahl ist schon geöffnet.");
        _;
    }    

    constructor() {
        admin = msg.sender;
    }


    // fkt. Wähler (Wählertoken, Wahlbezirk)
    function registerToken(string memory _token, uint _electionDistrict) public onlyAdmin onlyBeforeVoting  {

        for (uint i = 0; i < tokens.length; i++) { 
            if (tokens[i].token == keccak256(abi.encodePacked(_token)) && tokens[i].electionDistrict == _electionDistrict) {
                revert("Token already registered");
            }
        }

        Token memory token;
        token.token = keccak256(abi.encodePacked(_token));
        token.electionDistrict = _electionDistrict;
        tokens.push(token);
    }   

    function isTokenValid(string memory _token, uint _electionDistrict) public view returns (bool) {
        bool valid = false;
        for (uint i = 0; i < tokens.length; i++) {
            if (tokens[i].token == keccak256(abi.encodePacked(_token)) 
                && tokens[i].usedToken == false 
                && tokens[i].electionDistrict == _electionDistrict) {
                valid = true;
            }
        }
        return valid;
    }

    function markTokenUsed(string memory _token, uint _electionDistrict) public {

        // neue Methode
        for (uint i = 0; i < tokens.length; i++) {
            if (tokens[i].token == keccak256(abi.encodePacked(_token)) 
               && tokens[i].electionDistrict == _electionDistrict) {
                tokens[i].usedToken = true;
               } 
        }
    }

    // fkt. Wahl
    function startVoting(string memory _electionTitle) public onlyAdmin onlyBeforeVoting {
        // require(candidates.length >= 2, "Mindestens zwei Kandidaten erforderlich.");
        votingOpen = true;
        electionBegin = true;
        electionTitle = _electionTitle;
    }

    function endVoting() public onlyAdmin onlyDuringVoting {
        votingOpen = false;
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

    // Helper function to convert uint to string
    function uintToString(uint v) internal pure returns (string memory str) {
        if (v == 0) {
            return "0";
        }
        uint maxlength = 100;
        bytes memory reversed = new bytes(maxlength);
        uint i = 0;
        while (v != 0) {
            uint remainder = v % 10;
            v = v / 10;
            reversed[i++] = bytes1(uint8(48 + remainder));
        }
        bytes memory s = new bytes(i);
        for (uint j = 0; j < i; j++) {
            s[j] = reversed[i - j - 1];
        }
        str = string(s);
    }
}
