// components/types/Electron.d.ts
declare global {
  interface Window {
    electronAPI: {
      settings: {
        get: (key: string) => Promise<any>;
        set: (key: string, value: any) => Promise<void>;
        onChanged: (callback: (changes: Record<string, any>) => void) => void;
      };
      dynamicImport: (path: string) => Promise<any>;
    };
  }
}

export interface ElectronAPI {
  settings: {
    get: (key: string) => Promise<string | number | undefined>;
    set: (key: string, value: string | number) => Promise<void>;
  };
  onSettingsChanged: (callback: (event: unknown, newSettings: ElectronSettings) => void) => void;
}

export interface EthereumProvider {
  request: <T = unknown>(args: { method: string; params?: unknown[] }) => Promise<T>;
  on?: (event: string, handler: (...args: unknown[]) => void) => void;
  removeListener?: (event: string, handler: (...args: unknown[]) => void) => void;
}

export interface ElectronSettings {
  electionDistrict?: number;
  privateKey?: string;
}
