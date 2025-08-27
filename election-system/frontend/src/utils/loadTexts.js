//import { loadJson } from "./loadJson";

async function loadJson(relativePath) {
    // relativePath OHNE führenden Slash übergeben, z.B. "texts/start-texts.de.json"
    if (window.electronAPI?.invoke) {
      return await window.electronAPI.invoke("load-json", relativePath);
    } else {
      const base = (process.env.PUBLIC_URL || "").replace(/\/$/, "");
      const url = `${base}/${relativePath.replace(/^\//, "")}`;
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) {
        const body = await res.text().catch(() => "");
        throw new Error(
          `fetch ${url} -> ${res.status} ${res.statusText}; body starts: ${body.slice(0, 120)}`
        );
      }
      const text = await res.text();
      try {
        return JSON.parse(text);
      } catch {
        throw new Error(`Invalid JSON at ${url}; body starts: ${text.slice(0, 120)}`);
      }
    }
}

export async function loadTexts(file) {
    const lang = process.env.REACT_APP_LANG || "de";
    let loadedTexts;

    if (window.electronAPI?.invoke) {
        loadedTexts = await loadJson(`texts/${file}.${lang}.json`);			
    } else {
        // Aus public/texts laden
        const textsRes = await fetch(`/texts/${file}.${lang}.json`);
        if (!textsRes.ok) throw new Error("Textdatei nicht gefunden");
        loadedTexts = await textsRes.json();
    }
    return loadedTexts;  
}