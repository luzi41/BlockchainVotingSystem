#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{Manager};
use std::process::{Command, Stdio};

fn main() {
  tauri::Builder::default()
    .setup(|app| {
      // Prüfen, ob wir im Release-Build sind
      #[cfg(not(debug_assertions))]
      {
        let app_handle = app.handle();

        // Next.js Server starten
        tauri::async_runtime::spawn(async move {
          let mut child = Command::new("node")
            .arg("server.js") // das erzeugst du gleich im Next.js Root
            .current_dir("../nextFE/bvs") // Pfad anpassen
            .stdout(Stdio::null())
            .stderr(Stdio::null())
            .spawn()
            .expect("Konnte Next.js Server nicht starten");

          // kleinen Delay geben, bis der Server läuft
          std::thread::sleep(std::time::Duration::from_secs(3));

          // BrowserWindow auf localhost öffnen
          tauri::WindowBuilder::new(
            &app_handle,
            "main",
            tauri::WindowUrl::External("http://localhost:3002".parse().unwrap())
          )
          .title("BVS Wahlplattform")
          .build()
          .unwrap();

          // Kindprozess bleibt bestehen, solange App läuft
          let _ = child.wait();
        });
      }

      Ok(())
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri app");
}
