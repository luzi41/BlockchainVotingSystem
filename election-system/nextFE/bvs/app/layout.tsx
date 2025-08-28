import type { Metadata } from "next";
import LanguageSwitcher from "@components/LanguageSwitcher";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blockchain Voting System",
  description: "Blockchain Voting System",
};

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
        <nav className="main p-4 border-b" id="nav">
          <ul>
            <li><a href="/">Informationen zur Wahl</a></li>
            <li><a href="/vote">Abstimmen</a></li>
            <li><a href="/results">Ergebnisse</a></li>
            <li><a href="/extras">Extras</a></li>
            <li className="lang"><LanguageSwitcher /></li>
            <li className="title">
              <a href="https://github.com/luzi41/BlockchainVotingSystem" target="_blank">
                Blockchain Voting System 0.29
              </a>
            </li>
            
          </ul>
          
        </nav>        
    
        {children}
      </body>
    </html>
  );
}
