// utils/useTauri.ts
import { useEffect, useState } from "react";

export const useTauri = () => {
  const [isTauri, setIsTauri] = useState<boolean | null>(null);
  
  useEffect(() => {
    const detect = async () => {
      // Nur prüfen wenn wir im Browser sind
      if (typeof window === 'undefined') {
        setIsTauri(false);
        return;
      }
      
      // Schnelle synchrone Checks
      if ('__TAURI__' in window || navigator.userAgent.includes('Tauri')) {
        setIsTauri(true);
        return;
      }
      
      setIsTauri(false);
    };
    
    detect();
  }, []);
  
  return isTauri;
};