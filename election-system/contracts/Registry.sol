// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

// V 0.26.2 Multi-Election Registry

contract Registry {

    address public admin;

    struct Election {
        string title;
        bool votingOpen;
        bool electionBegin;
    }

    struct Token {
        bytes32 token;
        uint electionDistrict;
        bool usedToken;
    }

    // electionId => Election
    mapping(uint => Election) public elections;
    
    // Contract → electionId
    mapping(address => uint) public contractToElectionId;        

    // electionId => Token[]
    mapping(uint => Token[]) private electionTokens;

    uint public currentElectionId;

    modifier onlyAdmin() {
        require(msg.sender == admin, unicode"Nur der Admin kann diese Funktion ausführen!");
        _;
    }

    modifier onlyDuringVoting(uint electionId) {
        require(elections[electionId].votingOpen, unicode"Die Wahl ist nicht geöffnet.");
        _;
    }

    modifier onlyAfterVoting(uint electionId) {
        require(!elections[electionId].votingOpen && elections[electionId].electionBegin, unicode"Die Wahl ist noch geöffnet oder hat nicht begonnen.");
        _;
    }

    modifier onlyBeforeVoting(uint electionId) {
        require(!elections[electionId].electionBegin, unicode"Die Wahl ist schon geöffnet.");
        _;
    }    

    constructor() {
        admin = msg.sender;
    }

    // Neue Wahl anlegen
    function createElection(string memory _title) public onlyAdmin {
        currentElectionId++;
        elections[currentElectionId] = Election({
            title: _title,
            votingOpen: false,
            electionBegin: false
        });

        // Mapping setzen: diese Contract-Adresse → electionId
        contractToElectionId[address(this)] = currentElectionId;        
    }

    // Token-Registrierung
    function registerToken(uint electionId, string memory _token, uint _electionDistrict) public onlyAdmin onlyBeforeVoting(electionId) {
        Token[] storage tokens = electionTokens[electionId];
        for (uint i = 0; i < tokens.length; i++) { 
            if (tokens[i].token == keccak256(abi.encodePacked(_token)) && tokens[i].electionDistrict == _electionDistrict) {
                revert("Token already registered");
            }
        }
        tokens.push(Token({
            token: keccak256(abi.encodePacked(_token)),
            electionDistrict: _electionDistrict,
            usedToken: false
        }));
    }

    // --- Tokens Batch ---
    function registerTokens(
        uint electionId, 
        string[] memory _tokens, 
        uint[] memory _electionDistricts
    ) 
        public 
        onlyAdmin 
        onlyBeforeVoting(electionId) 
    {
        require(_tokens.length == _electionDistricts.length, "Length mismatch");

        Token[] storage tokens = electionTokens[electionId];

        for (uint i = 0; i < _tokens.length; i++) {
            bytes32 hashedToken = keccak256(abi.encodePacked(_tokens[i]));

            // Prüfen, ob der Token für den Wahlkreis schon existiert
            bool exists = false;
            for (uint j = 0; j < tokens.length; j++) {
                if (tokens[j].token == hashedToken && tokens[j].electionDistrict == _electionDistricts[i]) {
                    exists = true;
                    break;
                }
            }

            if (!exists) {
                tokens.push(Token({
                    token: hashedToken,
                    electionDistrict: _electionDistricts[i],
                    usedToken: false
                }));
            }
        }
    }

    function isTokenValid(uint electionId, string memory _token, uint _electionDistrict) public view returns (bool) {
        Token[] storage tokens = electionTokens[electionId];
        for (uint i = 0; i < tokens.length; i++) {
            if (tokens[i].token == keccak256(abi.encodePacked(_token)) 
                && !tokens[i].usedToken 
                && tokens[i].electionDistrict == _electionDistrict) {
                return true;
            }
        }
        return false;
    }

    function markTokenUsed(uint electionId, string memory _token, uint _electionDistrict) public {
        Token[] storage tokens = electionTokens[electionId];
        for (uint i = 0; i < tokens.length; i++) {
            if (tokens[i].token == keccak256(abi.encodePacked(_token)) 
               && tokens[i].electionDistrict == _electionDistrict) {
                tokens[i].usedToken = true;
            } 
        }
    }

    // Wahl-Status steuern
    function startVoting(uint electionId) public onlyAdmin onlyBeforeVoting(electionId) {
        elections[electionId].votingOpen = true;
        elections[electionId].electionBegin = true;
    }

    function endVoting(uint electionId) public onlyAdmin onlyDuringVoting(electionId) {
        elections[electionId].votingOpen = false;
    }

    function getElectionStatus(uint electionId) public view returns (string memory status, uint code) {
        Election storage e = elections[electionId];
        uint statusCode = 0;
        if (e.electionBegin) {
            if (e.votingOpen) {
                return (unicode"Die Wahl ist geöffnet.", statusCode);
            } else {
                statusCode = 1;
                return (unicode"Die Wahl ist geschlossen.", statusCode);
            }
        } else {
            statusCode = 2;
            return (unicode"Die Wahl hat noch nicht begonnen.", statusCode);
        }
    }

    function getElectionTitle(uint electionId) public view returns (string memory title) {
        return elections[electionId].title;
    }

    // Neue Getter-Funktion: electionId anhand der Contract-Adresse zurückgeben
    function getElectionIdByContract(address contractAddress) public view returns (uint) {
        return contractToElectionId[contractAddress];
    }
}
