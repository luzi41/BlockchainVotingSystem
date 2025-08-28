"use client";

import { useLanguage } from "@components/hooks/useLanguage";

export default function LanguageSwitcher() {
  const { lang, switchLanguage } = useLanguage();

  return (
    <div className="flex gap-2">
      <button
        className={`px-2 py-1 rounded ${lang === "de" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        onClick={() => switchLanguage("de")}
      >
        DE
      </button>
      <button
        className={`px-2 py-1 rounded ${lang === "en" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        onClick={() => switchLanguage("en")}
      >
        EN
      </button>
    </div>
  );
}
