// layout.tsx
"use client";
import Link from "next/link";
import LanguageSwitcher from "@components/LanguageSwitcher";
import { LanguageProvider, useLanguage } from "@components/contexts/LanguageContext";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppSettings } from "@components/hooks/useAppSettings";
import { loadTexts } from "@components/utils/loadTexts";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// Fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

interface NavigationTexts {
  informationAboutTheElection: string;
  help: string;
}

function Navigation({ texts }: { texts: NavigationTexts }) {
  const pathname = usePathname();

  const links = [
    { href: "/help", label: "Help"},
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
            Blockchain Voting Admin 0.1
          </Link>
        </li>
      </ul>
    </nav>
  );
}

// ---------- Innerer Content mit LanguageContext
function RootLayoutContent({ children }: { children: React.ReactNode }) {
  const { language } = useLanguage(); // ✅ funktioniert jetzt, weil Provider außenrum ist
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
	      <footer className="p-4 border-t flex justify-center items-center">
        <span id="ContractAddress">
          
        </span>
      </footer>
  </>		
	)
}

// ---------- RootLayout mit Provider außenrum
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <LanguageProvider>
          <RootLayoutContent>{children}</RootLayoutContent>
        </LanguageProvider>
      </body>
    </html>
  );
}