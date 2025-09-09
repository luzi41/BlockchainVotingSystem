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
                    <li><Link href="http://localhost:25000">{texts.electionExplorer}</Link></li>
                    <li><Link href="/extras/settings">{texts.settings}</Link></li>
                </ul>
            </nav>
        </div>
        {process.env.NEXT_PUBLIC_EXTENDED && 
        (
            <div className="col-50">
                <h2>Direkte Demokratie</h2>
                <p>
                    Sie haben hier die Möglichkeit selbst aktiv zu werden und die gesetzlich
                    vorgesehenen Möglichkeiten direkter Demokratie zu nutzen:
                </p>
                <ul className="lists-default ">
                    <li><a>Bürgerbegehren</a></li>
                    <li><a>Volksinitiative</a></li>
                    <li><a>Volksbegehren</a></li>
                </ul>                
            </div>
            
        )} 
    </div>
    );
}