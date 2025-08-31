#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use std::process::{Command, Stdio};

fn main() {
    // Stelle sicher, dass Next.js im Hintergrund gestartet wird (Production)
    #[cfg(not(debug_assertions))]
    {
        Command::new("npm")
            .args(&["run", "start"])  // Für den Production-Server
            .stdout(Stdio::null())
            .stderr(Stdio::null())
            .spawn()
            .expect("Konnte Next.js nicht starten");
    }

    tauri::Builder::default()
        .run(tauri::generate_context!())
        .expect("Fehler beim Starten der Tauri-App");
}