"use client";

import { useState, useEffect } from "react";
import { Contract, Wallet } from "ethers";
import forge from "node-forge";
import Image from "next/image";

import { useElectionStatus } from "./hooks/useElectionStatus";
import { loadTexts } from "./utils/loadTexts";

import scanner from "@public/scan-59.png";
import { Candidate, Party, Proposal, VoteFormTexts } from "./types/VoteFormTypes";

const isElectron =
  typeof navigator !== "undefined" &&
  navigator.userAgent.toLowerCase().includes("electron");

interface ElectronSettings {
  electionDistrict?: number;
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

export default function VoteForm({ electionDistrict, availableDistricts = [] }: VoteFormProps) {
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
  const [loading, setLoading] = useState(true);
  const [electionDistrictNo, setElectionDistrictNo] = useState<string>(electionDistrict);

  // Electron Settings Listener
  useEffect(() => {
    if (!isElectron) return;
    const ipc = window.electronAPI;
    if (!ipc) return;

    const handleSettingsChange = (_event: unknown, newSettings: ElectronSettings) => {
      if (newSettings.electionDistrict) setElectionDistrictNo(String(newSettings.electionDistrict));
      if (newSettings.privateKey) setPrivateKey(newSettings.privateKey);
    };

    ipc.onSettingsChanged(handleSettingsChange);
  }, []);

  // Texte und privateKey laden
  useEffect(() => {
    async function fetchTextsAndSettings() {
      try {
        const _texts = await loadTexts("voteForm-texts");
        setTexts(_texts);

        let _privateKey: string;
        let _electionDistrict: string = electionDistrict;

        if (isElectron) {
          const ipc = window.electronAPI;
          if (!ipc) return;
          const pk = await ipc.settings.get("privateKey");
          if (!pk) throw new Error("Fehlende privateKey im Electron Store");
          _privateKey = pk;
          const ed = await ipc.settings.get("electionDistrict");
          _electionDistrict = ed ? String(ed) : electionDistrict;
        } else {
          _privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY || Wallet.createRandom().privateKey;
          _electionDistrict = electionDistrict || process.env.NEXT_PUBLIC_ELECTION_DISTRICT || "";
        }

        setPrivateKey(String(_privateKey));
        setElectionDistrictNo(_electionDistrict);
      } catch (err: unknown) {
        console.error("Fehler beim Laden der Texte/Settings:", err);
        setError("❌ Fehler beim Laden der Konfiguration");
      }
    }

    fetchTextsAndSettings();
  }, [electionDistrict]);

  // Vertragsdaten laden
  useEffect(() => {
    if (!provider || !address || !electionId || !electionDistrictNo) return;

    async function fetchData() {
      try {
        const res = await fetch("/api/abi");
        const abiJson = await res.json();
        const contractAbi = abiJson.abi.abi;

        setAbi(contractAbi);
        //console.log("ABI JSON geladen:", abiJson);
        //console.log("ABI Array:", abiJson.abi);

        const ctr = new Contract(address, contractAbi, provider);
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
        setLoading(false);
      }
    }

    fetchData();
  }, [electionDistrictNo, address, electionId, provider]);

  const vote = async () => {
    if (!privateKey || !provider) return;
    try {
      const signer = new Wallet(privateKey, provider);
      const ctr = new Contract(address, abi, signer);

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
    }
  };

  if (!texts) return <p>Load texts ...</p>;

  return (
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
