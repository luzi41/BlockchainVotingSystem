"use client"
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import LanguageSwitcher from "@components/LanguageSwitcher";
import { usePathname } from "next/navigation";
//import { useEffect, useState } from "react";
//import { useAppSettings } from "@components/hooks/useAppSettings";
import { loadTexts } from "@components/utils/loadTexts";
//import { useElectionStatus } from "@components/hooks/useElectionStatus";


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
  vote: string;
  results: string;
  extras: string;
  help: string;
}

function Navigation({ texts }: { texts: NavigationTexts }) {
  const pathname = usePathname();

  const links = [
    { href: "/", label: texts.informationAboutTheElection },
    { href: "/vote", label: texts.vote },
    { href: "/results", label: texts.results },
    { href: "/extras", label: texts.extras },
    { href: "/help", label: texts.help},
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
            Blockchain Voting System 0.31.1
          </Link>
        </li>
      </ul>
    </nav>
  );
}



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
