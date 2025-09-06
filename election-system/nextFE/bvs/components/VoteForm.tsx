"use client";

import { useState, useEffect } from "react";
import { Contract, Wallet } from "ethers";
import forge from "node-forge";
import Image from "next/image";
import { invoke } from "@tauri-apps/api/core";

import { useElectionStatus } from "./hooks/useElectionStatus";
import { loadTexts } from "./utils/loadTexts";

import scanner from "@public/scan-59.png";
import { Candidate, Party, Proposal, VoteFormTexts } from "./types/VoteFormTypes";

const isElectron =
  typeof navigator !== "undefined" &&
  navigator.userAgent.toLowerCase().includes("electron");

interface ElectronSettings {
  electionDistrictNo?: number;
  privateKey?: string;
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
  electionDistrictNo: string;
  rpc_url: string;
  contract_address: string;
}

const isTauri =
  typeof window !== "undefined" && "__TAURI__" in window; // sicherer Check fürs FE

export default function VoteForm({  electionDistrict, availableDistricts = [], }: VoteFormProps) {
  const { provider, address, electionId } = useElectionStatus();

  const [abi, setAbi] = useState<any[]>([]);
  const [modus, setModus] = useState<number>(1);
  const [error, setError] = useState<string>("");
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
  const [loadingSettings, setLoadingSettings] = useState(true);
  const [electionDistrictNo, setElectionDistrictNo] = useState<string>("");
  const [errorAbi, setErrorAbi] = useState<string | null>(null);
  const [errorTexts, setErrorTexts] = useState<string | null>(null);
  const [errorSettings, setErrorSettings] = useState<string | null>(null);
  const [settings, setSettings] = useState<AppSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState("de");
  const [status, setStatus] = useState<string>("");

  // Texte laden
  useEffect(() => {
    const fetchTexts = async () => { 
      setErrorTexts(null);
      setLoadingTexts(true);      
      try {
        const _texts = await loadTexts("voteForm-texts");
        if (_texts !== null) {
          setTexts(_texts);
        } else {
          setErrorTexts("Keine Texte gefunden");
        }
      } catch (err: any) {
        console.error("Fehler beim Laden der Texte:", err);
        setErrorTexts("Fehler beim Laden der Texte");
      } finally {
        setLoadingTexts(false);
      }
    }

    async function fetchSettings() {
      let cancelled = false;
      try {
        const t = await loadTexts("settingsForm-texts");
        if (!cancelled) setTexts(t);

        if (isTauri) {
          // Echte Settings aus Tauri
          const s = await invoke<AppSettings>("get_all_settings");
          if (!cancelled) setSettings(s);
        } else {
          // Web-Fallback (read-only)
          const fallback: AppSettings = {
            electionDistrictNo:
              electionDistrictNo ||
              process.env.NEXT_PUBLIC_ELECTION_DISTRICT ||
              "1",
            rpc_url:
              process.env.NEXT_PUBLIC_RPC_URL || "http://127.0.0.1:8545",
            contract_address:
              process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ||
              "0x0000000000000000000000000000000000000000",
          };
          if (!cancelled) setSettings(fallback);
        }

        // FE-only Defaults
        if (!cancelled) {
          setLanguage(process.env.NEXT_PUBLIC_LANGUAGE || "de");
          setPrivateKey(process.env.NEXT_PUBLIC_PRIVATE_KEY || "");
        }
      } catch (err) {
        console.error("❌ Fehler beim Initialisieren der Settings:", err);
        if (!cancelled) setStatus("Fehler beim Laden der Einstellungen.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchTexts()
    fetchSettings();
    
  }, [electionDistrictNo]);

  // Vertragsdaten laden
  useEffect(() => {
    if (!provider || !address || !electionId || !electionDistrictNo) return;

    async function fetchData() {
      try {
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
        setModus(Number(m));

        if (Number(m) === 1) {
          const cand: Candidate[] = await ctr.getCandidates(electionId, electionDistrictNo);
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
      }
    }

    fetchData();
  }, [electionDistrictNo, address, electionId, provider]);

  const vote = async () => {
    if (!privateKey || !provider) return;
    try {
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
      if (err instanceof Error) setError("❌ Fehler: " + err.message);
      else setError("❌ Unbekannter Fehler!");
    } finally {
      //setLoading(false);
    }
  };

  // if (loadingTexts || loadingAbi || loadingSettings) return <p>Load data ...</p>;
  if (loadingAbi || loadingTexts) {
    return <p className="text-gray-500">⏳ Daten werden geladen ...</p>;
  }

  if (errorAbi || errorTexts || loadingSettings) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded-lg">
        <h3 className="font-bold">Fehler</h3>
        <ul className="list-disc pl-5">
          {errorAbi && <li>ABI konnte nicht geladen werden: {errorAbi}</li>}

        </ul>
      </div>
    );
  }  

  if (texts) return (
    <div>
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
          ) : (
            <p>{electionDistrictNo}</p>
          )}
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
