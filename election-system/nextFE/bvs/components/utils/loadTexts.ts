// components/utils/loadTexts.ts
import { VoteFormTexts } from "@components/types/VoteFormTypes";

const FALLBACK_TEXTS: VoteFormTexts = {
  yourToken: "Your token",
  token: "Enter token",
  yourElectionDistrict: "Your election district",
  firstVote: "First vote",
  secondVote: "Second vote",
  survey: "Survey",
  btnSend: "Send"
};

/**
 * Lädt Texte aus /public/texts/<lang>/<ns>.json
 * ns z.B. "voteForm-texts"
 */
export async function loadTexts(
  ns: "voteForm-texts",
  lang?: string
): Promise<VoteFormTexts> {
  // Sprache bestimmen (z.B. "de" oder "en")
  const guessed =
    (lang ||
      (typeof navigator !== "undefined"
        ? navigator.language.slice(0, 2)
        : "en")
    ).toLowerCase();

  // Fallback-Reihenfolge: guessed -> "de" -> "en"
  const candidates = [guessed, guessed === "de" ? "en" : "de", "en"];

  for (const l of candidates) {
    const url = `/texts/${l}/${ns}.json`;
    try {
      const res = await fetch(url, { cache: "force-cache" });
      if (res.ok) {
        const data = (await res.json()) as VoteFormTexts;
        return data;
      }
    } catch {
      // Ignorieren und nächste Sprache probieren
    }
  }

  // Letzter Fallback: hartkodierte Defaults
  console.warn(`[loadTexts] Texte nicht gefunden, nutze Fallback.`);
  return FALLBACK_TEXTS;
}
