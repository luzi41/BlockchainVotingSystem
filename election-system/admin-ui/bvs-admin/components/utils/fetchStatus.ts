import { JsonRpcProvider, Contract } from "ethers";
import Registry from "../../public/contracts/Registry.sol/Registry.json";

// Tauri-Dynamic Import → funktioniert auch im Web
const loadTauriAPI = async () => {
  try {
    const { invoke } = await import("@tauri-apps/api/core");
    return { invoke };
  } catch {
    return null;
  }
};

// Typisierung für die Settings aus Rust
interface AppSettings {
  election_district: string;
  rpc_url: string;
  contract_address: string;
  language:string
}

export async function fetchStatus() {
  try {
    let rpcURL: string | undefined;
    let contractAddress: string | undefined;

    // 🔎 Prüfen, ob wir in Tauri laufen
    const isTauri = typeof window !== "undefined" && "__TAURI__" in window;

    if (isTauri) {
      const tauriAPI = await loadTauriAPI();
      if (!tauriAPI) throw new Error("Tauri API konnte nicht geladen werden!");
      const s = await tauriAPI.invoke<AppSettings>("get_all_settings");
      rpcURL = s.rpc_url;
      contractAddress = s.contract_address;
    } else {
      // 🌍 Browser/Web-Fallback
      rpcURL = process.env.NEXT_PUBLIC_RPC_URL;
      contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
    }

    if (!rpcURL) throw new Error("Keine RPC-URL gesetzt!");
    if (!contractAddress) throw new Error("Keine Contract-Adresse gesetzt!");

    const provider = new JsonRpcProvider(rpcURL);

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
