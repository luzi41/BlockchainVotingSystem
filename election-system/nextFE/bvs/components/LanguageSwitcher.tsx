"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@components/contexts/LanguageContext";

interface LanguageDef {
  code: string;
  label: string;
}

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [availableLanguages, setAvailableLanguages] = useState<LanguageDef[]>([]);

  useEffect(() => {
    // Lade Liste aus public/languages.json
    fetch("/languages.json")
      .then((res) => res.json())
      .then((data: LanguageDef[]) => setAvailableLanguages(data))
      .catch((err) => {
        console.error("Fehler beim Laden der Sprachliste:", err);
        // Fallback: Nur DE/EN
        setAvailableLanguages([
          { code: "de", label: "DE" },
          { code: "en", label: "EN" },
        ]);
      });
  }, []);

  return (
    <div className="flex gap-2">
      {availableLanguages.map((lang) => (
        <button
          key={lang.code}
          className={`px-2 py-1 rounded ${
            language === lang.code
              ? "bg-blue-500 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
          onClick={() => setLanguage(lang.code as "de" | "en")}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
}
