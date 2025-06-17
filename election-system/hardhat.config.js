require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: "0.8.28",
    networks: {
        quorum: {
            url: "http://127.0.0.1:8545",
            chainId: 1337,
            // test accounts only, all good ;)
            accounts: [
                "0x8bbbb1b345af56b560a5b20bd4b0ed1cd8cc9958a16262bc75118453cb546df7"
            ]
        }
    }
};
