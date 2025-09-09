"use client"

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useAppSettings } from "./hooks/useAppSettings";
import { loadTexts } from "./utils/loadTexts";
import { ExtrasTexts } from "./types/ExtrasTypes";
import { useLanguage } from "./contexts/LanguageContext"; // 👈 wichtig!

export default function Extras() {
    const { language, setLanguage } = useLanguage();
    const { settings } = useAppSettings(
    "1",
    "de"
    );
    const [texts, setTexts] = useState<ExtrasTexts | null>(null);
    const [loadingTexts, setLoadingTexts] = useState<boolean>(true);

    // -------- Initiales Laden
    useEffect(() => {
        if (settings) {
            loadTexts("extras-texts", language).then(setTexts);
            setLoadingTexts(false);
        }
    }, [language,settings]);

    if (loadingTexts || !texts) return <p>⏳ Lade Texte …</p>;

    return (
    <div>
        <h3>Extras</h3>
        <nav className="menu">
            <ul className="lists-default">
                <li><Link href="http://localhost:25000">Explorer</Link></li>
                <li><Link href="/extras/settings">{texts.settings}</Link></li>
            </ul>
        </nav>
    </div>
    );
}