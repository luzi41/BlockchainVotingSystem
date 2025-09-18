"use client";
import Link from "next/link";
import { useState, useEffect, ReactElement } from "react";
import { loadTexts } from "./utils/loadTexts";
import { useRouter } from "next/navigation";
import { useLanguage } from "./contexts/LanguageContext"; // 👈 wichtig!
import { useAppSettings } from "./hooks/useAppSettings";

interface SettingsProps {
  electionDistrict: string;
  availableDistricts?: string[];
}

const isTauri =
  typeof window !== "undefined" && "__TAURI__" in window; // sicherer Check fürs FE

export function useNavigate() {
  const router = useRouter();

  return async (path: string) => {
    if (isTauri) {
      const { invoke } = await import("@tauri-apps/api/core");
      await invoke("navigate_to", { path });
    } else {
      router.push(path); // ✅ funktioniert in Next.js normal
    }
  };
}

export default function Home({
  electionDistrict,
  availableDistricts = [],
}: SettingsProps) {
    const { language, setLanguage } = useLanguage();
    const { settings, setSettings, isTauri, loading } = useAppSettings(
        electionDistrict,
        "de"
    );

    interface TextContent {
        /*
        titleRegistration: string;
        textRegistration: string;
        titleCandidates: string;
        titleParties: string;
        details: string;
        */
    }    

    const [isLoading, setIsLoading] = useState(true);
    const [texts, setTexts] = useState<TextContent | null>(null);
    const [htmlContent, setHtmlContent] = useState<ReactElement | null>(null); 
    const [title, setTitle] = useState("");

    // -------- Initiales Laden
    useEffect(() => {
        //if (settings) {
            loadTexts("home-texts", language).then(setTexts);
        //}
    }, [language, settings]);        

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h2>Blockchain Voting Admin</h2>  
        <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
          <li className="mb-2 tracking-[-.01em]">New election or survey</li>
          <li className="mb-2 tracking-[-.01em]">Edit election or survey</li>
          <li className="mb-2 tracking-[-.01em]">User/Roles Administration</li>
          <li className="mb-2 tracking-[-.01em]">Help</li>
        </ol>

      </main>

    </div>
  );
}