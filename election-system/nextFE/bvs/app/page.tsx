import Image from "next/image";

export default function Home() {
  const status = "Status nicht gesetzt.";
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <nav className="main" id="nav">
        <ul>
          <li><a href="">Informationen zur Wahl</a></li>
          <li><a href="/vote">Abstimmen</a></li>
          <li><a href="/results">Ergebnisse</a></li>
          <li><a href="/extras">Extras</a></li>
          <li className="title">
            <a href="https://github.com/luzi41/BlockchainVotingSystem" target="_blank">
              Blockchain Voting System 0.29
            </a>
          </li>
        </ul>
      </nav>
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">



      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <span id="ContractAddress">{status}</span>
      </footer>
    </div>
  );
}
