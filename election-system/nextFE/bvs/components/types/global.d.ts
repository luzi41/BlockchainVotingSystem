// components/types/global.d.ts
import { ElectronAPI } from "./Electron";
import { EthereumProvider } from "./Ethereum";

declare global {
  interface Window {
    electronAPI?: ElectronAPI;
    ethereum?: EthereumProvider;
  }
}
