// ✅ Web: statisch importierte ABIs (Registry)
import ProposalsABI from "../artifacts/contracts/Proposals.sol/Proposals.json";
// Wenn du weitere Modi hast, hier ergänzen:
import BundestagswahlABI from "../artifacts/contracts/Bundestagswahl.sol/Bundestagswahl.json";
// import OtherABI from "../artifacts/contracts/Other.sol/Other.json";
const ABI_REGISTRY = {
    Proposals: ProposalsABI,
    Bundestagswahl: BundestagswahlABI,
  // Other: OtherABI,
};

export async function loadAbi() { // function sollte auch ausgelagert werden!!!
// 🧠 ABI laden
const name = process.env.REACT_APP_ELECTION_MODE_NAME;
let abiJson;
if (window.electronAPI?.invoke) {
    // Electron: aus build/resources laden (IPC)
    try {
    abiJson = await window.electronAPI.invoke(`load-json`, `contracts/${name}.json`);
    } catch {
    abiJson = await window.electronAPI.invoke(
        `load-json`,
        `contracts/${name}.sol/${name}.json`
    );
    }
} else {
    // Web: direkt aus Import (kein fetch → keine HTML-404s)
    abiJson = ABI_REGISTRY[name];
    if (!abiJson) {
    throw new Error(
        `ABI "${name}" nicht in ABI_REGISTRY registriert. Bitte importieren und eintragen.`
    );
    }
}
return abiJson;
}