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
        <h1 className="text-3xl font-bold">
            Blockchain Voting System
        </h1>
        <p>&nbsp;</p>
        <div className="col-50">
            <h2>Extras</h2>
            <nav className="menu">
                <ul className="lists-default">
                    <li><Link href="/extras/settings">{texts.settings}</Link></li>                    
                    <li><Link href="http://localhost:25000">{texts.electionExplorer}</Link></li>
                    <li>{texts.ownElection}</li>
                    <li>{texts.ownNodes}</li>
                </ul>
            </nav>
        </div>
        {process.env.NEXT_PUBLIC_EXTENDED && 
        (
            <div className="col-50">
                <h2>{texts.directDemocracy}</h2>
                <p>{texts.activeYourself}:</p>
                <ul className="lists-default ">
                    <li><Link href="./buergerbegehren">{texts.citizensInitiative}</Link></li>
                    <li><Link href="./referendum">{texts.referendum}</Link></li>
                </ul>                
            </div>
        )} 
    </div>
    );
}