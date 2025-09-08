// app/layout.tsx
"use client";
import Link from "next/link";
import LanguageSwitcher from "@components/LanguageSwitcher";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// Fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

function Navigation() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Informationen zur Wahl" },
    { href: "/vote", label: "Abstimmen" },
    { href: "/results", label: "Ergebnisse" },
    { href: "/extras", label: "Extras" },
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
            href="https://github.com/luzi41/BlockchainVotingSystem"
            target="_blank"
          >
            Blockchain Voting System 0.30
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [contractAddress, setContractAddress] = useState("Lade...");

  useEffect(() => {
    // Dynamische Daten aus Tauri laden
    if ("__TAURI__" in window) {
      import("@tauri-apps/api/core").then(({ invoke }) => {
        invoke<string>("get_contract_address")
          .then(setContractAddress)
          .catch(() => setContractAddress("Fehler beim Laden"));
      });

      // Navigation-Eventlistener
      import("@tauri-apps/api/event").then(({ listen }) => {
        listen<string>("navigate", (event) => {
          const newPath = event.payload;
          window.location.hash = newPath; // später Router.push()
        });
      });
    }
  }, []);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navigation />
        {children}
        <footer
          id="footer"
          className="p-4 border-t flex justify-center items-center"
        >
          <span id="ContractAddress">
            Contract: <code>{contractAddress}</code>
          </span>
        </footer>
      </body>
    </html>
  );
}
