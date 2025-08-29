import Link from "next/link";
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
  icons: {
    icon: "/favicon.ico", // ✅ liegt in /public
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const status = "Nicht implementiert!";
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav className="main p-4 border-b" id="nav">
          <ul>
            <li><Link href="/">Informationen zur Wahl</Link></li>
            <li><Link href="/vote">Abstimmen</Link></li>
            <li><Link href="/results">Ergebnisse</Link></li>
            <li><Link href="/extras">Extras</Link></li>
            <li className="lang"><LanguageSwitcher /></li>
            <li className="title">
              <Link
                href="https://github.com/luzi41/BlockchainVotingSystem"
                target="_blank"
              >
                Blockchain Voting System 0.29
              </Link>
            </li>
          </ul>
        </nav>
        {children}
        <footer
          id="footer"
          className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"
        >
          <span id="ContractAddress">{status}</span>
        </footer>
      </body>
    </html>
  );
}
