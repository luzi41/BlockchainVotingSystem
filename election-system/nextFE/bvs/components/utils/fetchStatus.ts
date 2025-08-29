import { JsonRpcProvider, Contract } from "ethers";
import Registry from "../../public/contracts/Registry.sol/Registry.json";

const isElectron =
  typeof navigator !== "undefined" &&
  navigator.userAgent.toLowerCase().includes("electron");

export async function fetchStatus() {
  try {
    let rpcURL = process.env.NEXT_PUBLIC_RPC_URL;

    if (isElectron && window.electronAPI) {
      const ipc = window.electronAPI;
      const ipcRpc = await ipc.settings.get("rpcURL");
      if (ipcRpc) rpcURL = String(ipcRpc);
      else throw new Error("Fehlende RPC-URL im Electron Store");
    }

    if (!rpcURL) throw new Error("Keine RPC-URL gesetzt!");

    const provider = new JsonRpcProvider(rpcURL);

    let contractAddress = String(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);
    if (isElectron && window.electronAPI) {
      const ipc = window.electronAPI;
      const ipcAddress = await ipc.settings.get("contractAddress");
      if (ipcAddress) contractAddress = String(ipcAddress);
    }

    if (!contractAddress) throw new Error("Keine Contract-Adresse gesetzt!");

    const contract = new Contract(contractAddress, Registry.abi, provider);

    const electionId = await contract.getElectionIdByContract(contractAddress);
    if (!electionId) throw new Error("Keine electionId gefunden!");

    const title = await contract.getElectionTitle(electionId);
    const status = await contract.getElectionStatus(electionId);

    return { title, status, error: null, provider, contractAddress, electionId };
  } catch (err: unknown) {
    console.error("Fehler beim Abrufen des Wahlstatus:", err);
    return {
      title: "Blockchain Voting System",
      status: "⚠️ Verbindung zum RPC-Server fehlgeschlagen!",
      error: err instanceof Error ? err : new Error("Unbekannter Fehler"),
      provider: null,
      contractAddress: null,
      electionId: null,
    };
  }
}
