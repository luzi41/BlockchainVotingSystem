// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

// V 0.15.6

contract Election {

    // alte Methode
    mapping(bytes32 => bool) public registeredTokens;
    mapping(bytes32 => bool) public usedTokens;

    address public admin;
    bool public votingOpen;
    bool public electionBegin;
    string public electionTitle;

    struct Token {
        bytes32 token;
        uint electionDistrict;
        bool usedToken;
    }

    struct ElectionDistrict {
        string name;
        uint nummer;
    }

    struct Candidate {
        string name;
        uint wahlbezirk;
        string partei;
    }

    struct ElectionResult {
        string tally;
        string signature;
        uint timestamp;
        uint electionDistrict;
    }

    struct EncryptedVote {
        string vote;
        uint electionDistrict;
    }

    //array to store encrypted votes
    EncryptedVote[] public encryptedVotes;

    ElectionDistrict[] public electionDistricts;

    // Array to store candidates
    Candidate[] public candidates;

    // Array to store decrypted results
    ElectionResult[] public electionResults;

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

    // fkt. Wahlbezirke (ElectionDistricts)
    function getElectionDistricts() public view returns (ElectionDistrict[] memory){
        return electionDistricts;
    }

    function registerElectionDistrict(string memory _name, uint _nummer) public onlyAdmin onlyBeforeVoting {
        electionDistricts.push(ElectionDistrict({name: _name, nummer: _nummer}));
    }
  
    // fkt. Kandidaten
    function registerCandidate(string memory _name, uint _wahlbezirk, string memory _partei) public onlyAdmin onlyBeforeVoting {
        bool found = false;
        for (uint i = 0; i < electionDistricts.length; i++)
        {
            if (electionDistricts[i].nummer == _wahlbezirk) {
                candidates.push(Candidate({name: _name, wahlbezirk: _wahlbezirk, partei: _partei}));
                found = true;
                break;
            }
        }
        if (!found) {
            revert(unicode"Kein gültiger Wahlbezirk!");
        }
        
    }

    function getCandidates(uint _wahlbezirk) public view returns (Candidate[] memory) {
        // First, count how many candidates match the wahlbezirk
        uint count = 0;
        for (uint i = 0; i < candidates.length; i++) {
            if (candidates[i].wahlbezirk == _wahlbezirk) {
                count++;
            }
        }

        // Create a new array with the correct size
        Candidate[] memory filteredCandidates = new Candidate[](count);
        if (count == 0) {
            return new Candidate[](0); // Return an empty array if no candidates found
        }

        uint index = 0;
        for (uint i = 0; i < candidates.length; i++) {
            if (candidates[i].wahlbezirk == _wahlbezirk) {
                filteredCandidates[index] = candidates[i];
                index++;
            }
        }
        return filteredCandidates;
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
        // alte Methode
        //return registeredTokens[keccak256(abi.encodePacked(_token))] && !usedTokens[keccak256(abi.encodePacked(_token))];

        // neue Methode
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
        // alte Methode
        // require(registeredTokens[keccak256(abi.encodePacked(_token))], "Token not registered");
        // require(!usedTokens[keccak256(abi.encodePacked(_token))], "Token already used");
        // usedTokens[keccak256(abi.encodePacked(_token))] = true;

        // neue Methode
        for (uint i = 0; i < tokens.length; i++) {
            if (tokens[i].token == keccak256(abi.encodePacked(_token)) 
               && tokens[i].electionDistrict == _electionDistrict) {
                tokens[i].usedToken = true;
               } 
        }
    }

    function castEncryptedVote(string memory _encryptedVote, string memory _token, uint _wahlbezirk) public onlyDuringVoting {
        require(isTokenValid(_token, _wahlbezirk), "Invalid or used token");
        markTokenUsed(_token, _wahlbezirk);
        EncryptedVote memory encryptedVote;
        encryptedVote.vote = _encryptedVote;
        encryptedVote.electionDistrict = _wahlbezirk;
        encryptedVotes.push(encryptedVote);
    }

    // fkt. Wahl
    function startVoting(string memory _electionTitle) public onlyAdmin onlyBeforeVoting {
        require(candidates.length >= 2, "Mindestens zwei Kandidaten erforderlich.");
        votingOpen = true;
        electionBegin = true;
        electionTitle = _electionTitle;
    }

    function endVoting() public onlyAdmin onlyDuringVoting {
        votingOpen = false;
    }

    function getEncryptedVotes(uint _wahlbezirk) public view onlyAfterVoting onlyAdmin returns (EncryptedVote[] memory) {

        // First, count how many votes match the wahlbezirk
        uint count = 0;
        for (uint i = 0; i < encryptedVotes.length; i++) {
            if (encryptedVotes[i].electionDistrict == _wahlbezirk) {
                count++;
            }
        }

        // Create a new array with the correct size
        EncryptedVote[] memory filteredEncryptedVotes = new EncryptedVote[](count);
        if (count == 0) {
            return new EncryptedVote[](0); // Return an empty array if no candidates found
        }
        
        uint index = 0;
        for (uint i = 0; i < encryptedVotes.length; i++) {
            if (encryptedVotes[i].electionDistrict == _wahlbezirk) {
                filteredEncryptedVotes[index] = encryptedVotes[i];
                index++;
            }
        }
        return filteredEncryptedVotes;
    }

    function storeElectionResult(string memory _tally, string memory _signature, uint _wahlbezirk) public onlyAfterVoting onlyAdmin {
        ElectionResult memory result;
        result.tally = _tally;
        result.signature = _signature;
        result.timestamp = block.timestamp;
        result.electionDistrict = _wahlbezirk;
        electionResults.push(result);
    }

    //fkt. public Client
    // Gibt nur den Datensatz für den letzten Bezirk zurück (alt)
    function getElectionResults() public view onlyAfterVoting returns (string memory tally, uint wahlbezirk, string memory signature, uint timestamp) {
        
        uint index = electionResults.length -1; // index letzter Datensatz im Array (fängt bei Null an!)

        ElectionResult storage result = electionResults[index];
        return (result.tally, result.electionDistrict, result.signature, result.timestamp);
    }

    // Neu: Gibt Datensatz für einen bestimmten Wahlbezirk zurück
    function getElectionResultsDistrict(uint _electionDistrict) public view onlyAfterVoting returns (ElectionResult[] memory _electionResults) {
        uint count = 0;
        for (uint i = 0; i < electionResults.length; i++) {
            if (electionResults[i].electionDistrict == _electionDistrict) {
                count++;
                //ElectionResult storage result = electionResults[i];
                //result[i] = (result.tally, result.electionDistrict, result.signature, result.timestamp);
            }
        }
        ElectionResult[] memory _results = new ElectionResult[](count);
        if (count == 0) {
            return new ElectionResult[](0); // Return an empty array if no candidates found
        }
        uint index = 0;
        for (uint i; i < electionResults.length; i++) {
            if (electionResults[i].electionDistrict == _electionDistrict) {
                _results[index] = electionResults[i];
                index++;
            }
        }    
        return _results;
        //revert(string(abi.encodePacked("No results for district ", uintToString(_electionDistrict))));
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
