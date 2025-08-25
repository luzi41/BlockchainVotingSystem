// src/utils/fetchStatus.js
import { JsonRpcProvider, Contract } from "ethers";
import Election from "../artifacts/contracts/Registry.sol/Registry.json";

const isElectron = navigator.userAgent.toLowerCase().includes("electron");

export async function fetchStatus() {
  try {
    let _rpcURL = process.env.REACT_APP_RPC_URL;

    if (isElectron && window.electronAPI) {
      const ipc = window.electronAPI;
      _rpcURL = await ipc.settings.get("rpcURL");
      if (!_rpcURL) {
        throw new Error("Fehlende Einstellungen (_rpcURL) im Electron Store");
      }
    }

    const _provider = new JsonRpcProvider(_rpcURL);
    const _contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
    const _contract = new Contract(_contractAddress, Election.abi, _provider);

    const _electionId = await _contract.getElectionIdByContract(_contractAddress);
    if (!_electionId) {
      throw new Error("No electionId!");
    }

    const electionTitle = await _contract.getElectionTitle(_electionId);
    const electionStatus = await _contract.getElectionStatus(_electionId);

    return {
      title: electionTitle,
      status: `${_contractAddress}: ${electionStatus}`,
      error: null,
      provider: _provider,
      contractAddress: _contractAddress,
      electionId: _electionId,
      //contract: _contract,
    };
  } catch (error) {
    console.error("Fehler beim Abrufen des Wahlstatus:", error);
    return {
      title: "Blockchain Voting System",
      status: "⚠️ Verbindung zum RPC-Server fehlgeschlagen!",
      error: error,
    };
  }
}
