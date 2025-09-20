// app/users/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "./contexts/LanguageContext"; // 👈 wichtig!
import { loadTexts } from "./utils/loadTexts";
import { useAppSettings } from "./hooks/useAppSettings";

interface SettingsProps {
    electionDistrict: string;
    availableDistricts?: string[];
}

export default function UsersPage({
    electionDistrict,
    availableDistricts = [],
}: SettingsProps) {

    interface TextContent {
        users: string;
        loading: string;
        noEmail: string;
    }

    const { language, setLanguage } = useLanguage();
    const { settings, setSettings, isTauri, loading } = useAppSettings(
        electionDistrict,
        "de"
    );    
    const [users, setUsers] = useState<any[]>([]);
    const [texts, setTexts] = useState<TextContent | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // -------- Initiales Laden
    useEffect(() => {
        //if (settings) {
            loadTexts("users-texts", language).then(setTexts);
        //}
    }, [language, settings]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch("/api/users");
        if (!res.ok) throw new Error("API request failed");
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.error("Konnte Benutzer nicht laden:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchUsers();
  }, []);
    if (!texts) return;

    return (
    <div>
        <h2>{texts.users}</h2>
        {loading ? (
        <div>{texts.loading}</div>
        ) : (
        <ul>
            {users.map((u) => (
            <li key={u.id}>
                {u.username} ({u.email ?? texts.noEmail})
            </li>
            ))}
        </ul>
        )}
    </div>
    );
}
