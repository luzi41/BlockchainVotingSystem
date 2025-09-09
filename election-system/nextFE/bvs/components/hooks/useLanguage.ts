"use client";

import { useState, useEffect } from "react";

export type Language = "de" | "en";

export function useLanguage() {
  const [lang, setLang] = useState<Language>("de");

  useEffect(() => {
    // Sprache aus localStorage laden, falls gespeichert
    const saved = localStorage.getItem("lang") as Language | null;
    if (saved) {
      setLang(saved);
    }
  }, []);

  const switchLanguage = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem("lang", newLang);
  };

  return { lang, switchLanguage };
}
