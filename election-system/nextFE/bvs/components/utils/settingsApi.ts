import { invoke } from "@tauri-apps/api/core";

const isTauri = typeof window !== "undefined" && "__TAURI__" in window;

export const settingsApi = {
  async get(key: string): Promise<string | null> {
    if (isTauri) {
      try {
        switch (key) {
          case "electionDistrict":
            return await invoke<string>("get_election_district");
          case "rpcURL":
            return await invoke<string>("get_rpc_url");
          case "contractAddress":
            return await invoke<string>("get_contract_address");
          default:
            console.warn(`⚠️ Unbekannter Setting-Key: ${key}`);
            return null;
        }
      } catch (err) {
        console.error("❌ Fehler beim Lesen von Settings:", err);
        return null;
      }
    } else {
      // 🌐 Web-Fallback: ENV-Variablen
      switch (key) {
        case "electionDistrict":
          return process.env.NEXT_PUBLIC_ELECTION_DISTRICT ?? null;
        case "rpcURL":
          return process.env.NEXT_PUBLIC_RPC_URL ?? null;
        case "contractAddress":
          return process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ?? null;
        default:
          return null;
      }
    }
  },

  async updateAll(
    electionDistrict: string,
    rpcURL: string,
    contractAddress: string
  ): Promise<void> {
    if (isTauri) {
      try {
        await invoke("update_all_settings", {
          newDistrict: electionDistrict,
          newRpcUrl: rpcURL,
          newContractAddress: contractAddress,
        });
      } catch (err) {
        console.error("❌ Fehler beim Speichern von Settings:", err);
        throw err;
      }
    } else {
      console.log("🌐 Web: Settings nur ENV (read-only).", {
        electionDistrict,
        rpcURL,
        contractAddress,
      });
    }
  },
};
