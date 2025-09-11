"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Contract, Wallet } from "ethers";
import forge from "node-forge";
import Image from "next/image";
import { useElectionStatus } from "./hooks/useElectionStatus";
import { useAppSettings } from "./hooks/useAppSettings";
import { loadTexts } from "./utils/loadTexts";
import scanner from "@public/scan-59.png";
import { Candidate, Party, Proposal, VoteFormTexts } from "./types/VoteFormTypes";
import { useLanguage } from "./contexts/LanguageContext"; // 👈 wichtig!

// Sichere Tauri API Imports mit korrekten Types
let invoke: ((cmd: string, args?: any) => Promise<any>) | null = null;
try {
  // Dynamischer Import für Tauri APIs
  const tauriCore = require("@tauri-apps/api/core");
  invoke = tauriCore.invoke;
} catch (error) {
  console.log("Tauri APIs nicht verfügbar (Web-Modus)");
}

async function encryptVote(_toVoted: string | number, _publicKey: string): Promise<string> {
  const pubKey = forge.pki.publicKeyFromPem(_publicKey);
  const encrypted = pubKey.encrypt(_toVoted.toString(), "RSA-OAEP");
  return forge.util.encode64(encrypted);
}

interface VoteFormProps {
  electionDistrict: string;
  availableDistricts?: string[];
}

export interface AppSettings {
  election_district: string;
  rpc_url: string;
  contract_address: string;
  language: string;
}

export default function VoteForm({  electionDistrict, availableDistricts = [], }: VoteFormProps) {
  const { language, setLanguage } = useLanguage();
  const { settings, setSettings, isTauri, loading } = useAppSettings(
    electionDistrict,
    "de"
  );   
  const { provider, address, electionId, status } = useElectionStatus();
  const [abi, setAbi] = useState<any[]>([]);
  const [modus, setModus] = useState<number>(1);
  const [tokenInput, setTokenInput] = useState<string>("");
  const [privateKey, setPrivateKey] = useState<string>("");
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [parties, setParties] = useState<Party[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState<string>("");
  const [selectedParty, setSelectedParty] = useState<string>("");
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [texts, setTexts] = useState<VoteFormTexts | null>(null);
  const [loadingTexts, setLoadingTexts] = useState(true);
  const [loadingAbi, setLoadingAbi] = useState(true);
  const [electionDistrictNo, setElectionDistrictNo] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
    // -------- Initiales Laden
    useEffect(() => {
    if (settings) {
        setElectionDistrictNo(settings.election_district);
        setPrivateKey(settings.private_key);
        console.log("PrivateKey:", settings.private_key);
        loadTexts("voteForm-texts", language).then(setTexts);
        setLoadingTexts(false);
    }
    }, [language, settings]);

  // Vertragsdaten laden
  useEffect(() => {
    if (!provider || !address || !electionId ) {
      console.log("!provider || !address || !electionId || !electionDistrictNo");
      
      return
    };

    async function fetchData() {
      try {
        console.log("Jetzt provider && address && electionId && electionDistrictNo", settings?.election_district);

        // ABI von statischer Datei laden (statt API Route)
        const abiResponse = await fetch('/contracts/Bundestagswahl.sol/Bundestagswahl.json');
        if (!abiResponse.ok) {
            throw new Error(`ABI laden fehlgeschlagen: ${abiResponse.status}`);
        }
        
        const abiData = await abiResponse.json();
        const abi = abiData.abi || abiData; // Fallback falls die Struktur variiert

        setAbi(abi);
        //console.log("ABI JSON geladen:", abiJson);
        //console.log("ABI Array:", abiJson.abi);

        const ctr = new Contract(String(address), abi, provider);
        const m = await ctr.getModus();
        const _title = await ctr.getElectionTitle(electionId);
        setTitle(_title);        
        setModus(Number(m));

        if (Number(m) === 1) {
          const cand: Candidate[] = await ctr.getCandidates(electionId, settings?.election_district);
          const part: Party[] = await ctr.getParties(electionId);
          setCandidates(cand);
          setParties(part);
        } else if (Number(m) === 2) {
          const prop: Proposal[] = await ctr.getProposals(electionId);
          setProposals(prop);
        }
      } catch (err: unknown) {
        console.error("Fehler beim Abrufen der Daten:", err);
      } finally {
        setLoadingAbi(false);
        setIsLoading(false);
      }
    }

    fetchData();
  }, [electionDistrictNo, address, electionId, provider]);

  const vote = async () => {
    if (!privateKey || !provider) return;
    try {
      console.log("PrivateKey:", privateKey);
      const signer = new Wallet(privateKey, provider);
      const ctr = new Contract(String(address), abi, signer);

      if (modus === 1) {
        const _electionDistrict = await ctr.getElectionDistrictByNumber(
          electionId,
          electionDistrictNo
        );
        const encrypted1 = await encryptVote(selectedCandidate, _electionDistrict.publicKey);
        const encrypted2 = await encryptVote(selectedParty, _electionDistrict.publicKey);
        const tx = await ctr.castEncryptedVote(
          electionId,
          encrypted1,
          encrypted2,
          tokenInput,
          electionDistrictNo
        );
        await tx.wait();
        setError("✅ Erfolgreich! Transaction: " + tx.hash);
      } else if (modus === 2) {
        const publicKey = await ctr.getPublicKey();
        const encrypted = await encryptVote(selectedAnswer || "", publicKey);
        const tx = await ctr.castEncryptedVote(electionId, encrypted, tokenInput);
        await tx.wait();
        setError("✅ Erfolgreich! Transaction: " + tx.hash);
      }
      
    } catch (err: unknown) {
      if (err instanceof Error) setError("❌ Fehler: " + err.message + " electionId: " + electionId + " electionDistrict: " + electionDistrictNo);
      else setError("❌ Unbekannter Fehler!");
    } 
  };

  if (isLoading) {
      return (
          <div className="flex flex-col items-center gap-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p>Lade Wahlsystem...</p>
                <p>{status}</p>
              
              {!provider && (
              <div>
                  <p><Link href= "/extras/settings/">Check Settings</Link></p>
                  <p><Link href= "/help">Help</Link></p>
              </div>
              )}
          </div>
      );
  }  

  // if (loadingTexts || loadingAbi || loadingSettings) return <p>Load data ...</p>;
  if (loadingAbi ) {
    return <p className="text-gray-500">⏳ Abi wird geladen ...</p>;
  }
  if (loadingTexts) {
    return <p className="text-gray-500">⏳ Texte werden geladen ...</p>;
  }

  if (texts) return (
    <div>
      <h1 className="text-3xl font-bold text-center">
        {title}
      </h1>
      <div className="row">
        <div className="col-50">
          <p>{texts.yourToken}</p>
          <p>
            <input
              name="token"
              type="text"
              placeholder={texts.token}
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
            />
            <button name="scanToken" className="btn">
              <Image src={scanner} alt="Scan icon" width={13} height={13} />
            </button>
          </p>
        </div>
        <div className="col-50">
          <p>{texts.yourElectionDistrict}</p>
          {availableDistricts.length > 1 ? (
            <select
              value={electionDistrictNo}
              onChange={(e) => setElectionDistrictNo(e.target.value)}
            >
              {availableDistricts.map((d) => (
                <option key={d} value={d}>
                  Bezirk {d}
                </option>
              ))}
            </select>
          ) : (<p>{settings?.election_district}</p>)}
        </div>
      </div>

      {modus === 1 && (
        <div id="ballot">
          <div id="erststimme">
            <h2>{texts.firstVote}</h2>
            {candidates.map((c, i) => (
              <div className="row" key={i}>
                <div className="col-95">
                  <span className="left">{c.name}</span>
                  <span className="right">{c.partei}</span>
                </div>
                <div className="col-5">
                  <input
                    type="radio"
                    className="vote"
                    value={c.name}
                    name="candidate"
                    onChange={(e) => setSelectedCandidate(e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>

          <div id="zweitstimme">
            <h2>{texts.secondVote}</h2>
            {parties.map((p, i) => (
              <div className="row" key={i}>
                <div className="col-95">
                  <span className="left">
                    {p.name} &nbsp; {p.shortname}
                  </span>
                </div>
                <div className="col-5">
                  <input
                    type="radio"
                    className="radio"
                    value={p.shortname}
                    name="party"
                    onChange={(e) => setSelectedParty(e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {modus === 2 && (
        <div>
          <h2>{texts.survey}</h2>
          {proposals.map((p, i) => (
            <div className="row" key={i}>
              <div className="col-80">{p.text}</div>
              <div className="col-10">
                {p.answer1}
                <input
                  type="radio"
                  className="radio"
                  value={p.answer1}
                  name="accepted"
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                />
              </div>
              <div className="col-10">
                {p.answer2}
                <input
                  type="radio"
                  className="radio"
                  value={p.answer2}
                  name="accepted"
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="center">
        <button name="send" type="submit" onClick={vote} disabled={!tokenInput}>
          {texts.btnSend}
        </button>
        <p>{error}</p>
      </div>
    </div>
  );
}
