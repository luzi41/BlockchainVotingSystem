#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use tauri::Manager;
use std::process::{Command, Stdio, Child};
use std::sync::{Arc, Mutex};


fn main() {
  // Hier speichern wir den Next.js-Prozess, damit wir ihn später beenden können
  let child_process: Arc<Mutex<Option<Child>>> = Arc::new(Mutex::new(None));
  let process_handle = child_process.clone();

  // Next.js Server nur im Release-Modus starten (im Dev macht Tauri -> npm run dev)
  #[cfg(not(debug_assertions))]
  {
    let mut child = Command::new("npm")
      .args(&["run", "start"])
      .current_dir("../nextFE/bvs") // Pfad zu deinem Next.js Projekt
      .stdout(Stdio::null())
      .stderr(Stdio::null())
      .spawn()
      .expect("Failed to start Next.js server");

    *process_handle.lock().unwrap() = Some(child);
  }

  tauri::Builder::default()
    .setup(|app| {
      let window = app.get_webview_window("main").unwrap();
      // Lade Next.js Frontend
      window.eval("window.location.replace('http://localhost:3002');").unwrap();
      Ok(())
    })

    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
