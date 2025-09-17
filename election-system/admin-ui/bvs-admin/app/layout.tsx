"use client"

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import LanguageSwitcher from "@components/LanguageSwitcher";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppSettings } from "@components/hooks/useAppSettings";
import { loadTexts } from "@components/utils/loadTexts";
import { useLanguage, LanguageProvider } from "@components/contexts/LanguageContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

interface NavigationTexts {
  start: string;
  elections: string;
  users: string;
  help: string;
  about: string;
}

function Navigation({ texts }: { texts: NavigationTexts }) {
  const pathname = usePathname();

  const links = [
    { href: "/", label: texts.start },
    { href: "/elections", label: texts.elections },
    { href: "/users", label: texts.users },
    { href: "/help", label: texts.help },
    { href: "/about", label: texts.about },
  ];

  return (
    <nav className="main p-4 border-b" aria-label="Hauptnavigation">
      <ul className="flex gap-4 items-center">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={pathname === link.href ? "font-bold underline" : ""}
            >
              {link.label}
            </Link>
          </li>
        ))}
        <li className="ml-auto">
          <LanguageSwitcher />
        </li>
        <li>
          <Link
            className="padding-right-15px"
            href="https://github.com/luzi41/BlockchainVotingSystem/blob/main/README.md"
          >
            Blockchain Voting Admin 0.50.3
          </Link>
        </li>
      </ul>
    </nav>
  );
}

// ---------- Innerer Content mit LanguageContext
function RootLayoutContent({ children }: { children: React.ReactNode }) {
  //const { provider, address, electionId } = useElectionStatus();
  const [contractAddress, setContractAddress] = useState("");
  const { language } = useLanguage(); 
  const [texts, setTexts] = useState<NavigationTexts | null>(null);
  const { settings } = useAppSettings("1", "de");
  

  // Texte laden, wenn Sprache oder Settings wechseln
  useEffect(() => {
    if (settings) {
      loadTexts("navigation-texts", language).then(setTexts);
    }
  }, [language, settings]);
 
  return (
    <>
      {texts && <Navigation texts={texts} />}
      {children}
    </>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LanguageProvider>
          <RootLayoutContent>{children}</RootLayoutContent>
        </LanguageProvider>
        <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
          Status Datenbank
        </footer>        
      </body>
    </html>
  );
}
