import { VoteFormTexts } from "../types/VoteFormTexts";

export async function loadTexts(fileName: string): Promise<VoteFormTexts> {
  try {
    const res = await fetch(`/texts/${fileName}.json`);
    if (!res.ok) throw new Error("Texts-Datei nicht gefunden");
    const data: VoteFormTexts = await res.json();
    return data;
  } catch (err) {
    console.error("Fehler beim Laden der Texte:", err);
    return {
      yourToken: "",
      token: "",
      yourElectionDistrict: "",
      firstVote: "",
      secondVote: "",
      survey: "",
      btnSend: ""
    };
  }
}
