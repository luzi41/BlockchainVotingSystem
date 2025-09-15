"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useAppSettings, saveAppSettings, AppSettings } from "@components/hooks/useAppSettings";

type Language = "de" | "en";

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  loading: boolean;
  error: string | null;
}

const LanguageContext = createContext<LanguageContextProps>({
  language: "de",
  setLanguage: () => {},
  loading: false,
  error: null,

});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const { settings, setSettings, loading, error } = useAppSettings("1", "de");
  const [language, setLanguageState] = useState<Language>("de");

  // Sprache nur beim ersten Laden setzen
  useEffect(() => {
    if (settings?.language && (settings.language === "de" || settings.language === "en")) {
      setLanguageState(settings.language);
      document.documentElement.lang = settings.language;
    }
    // ⛔ wichtig: kein "settings" als dependency, sonst läuft es bei jedem Update!
  }, []);

const setLanguage = (lang: Language) => {
  console.log("Setze Sprache:", lang);
  setLanguageState(lang);
  document.documentElement.lang = lang;

  if (settings) {
    const updated: AppSettings = { ...settings, language: lang };
    setSettings(updated);           // sofort im Context
    saveAppSettings(updated)         // async, UI reagiert sofort
      .then((res) => console.log("Settings gespeichert:", res.message))
      .catch((err) => console.error("Fehler beim Speichern:", err));
  } else {
    console.warn("settings noch nicht geladen, Sprache nur temporär gesetzt");
  }
};

  return (
    <LanguageContext.Provider value={{ language, setLanguage, loading, error }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
