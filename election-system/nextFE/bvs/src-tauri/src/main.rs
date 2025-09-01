#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::process::{Child, Command, Stdio};
use std::sync::{Arc, Mutex};
use tauri::{RunEvent};

fn main() {
    let child_process: Arc<Mutex<Option<Child>>> = Arc::new(Mutex::new(None));
    let child_process_clone = Arc::clone(&child_process);

    tauri::Builder::default()
        .setup(move |_app| {
            #[cfg(not(debug_assertions))]
            {
                // Release: Next.js Server starten
                let child = Command::new("npm")
                    .args(&["run", "start"])
                    .current_dir("../nextFE/bvs") // Next.js-Root
                    .stdout(Stdio::inherit())
                    .stderr(Stdio::inherit())
                    .spawn()
                    .expect("Failed to start Next.js server");

                *child_process.lock().unwrap() = Some(child);
            }
            Ok(())
        })
        .build(tauri::generate_context!())
        .expect("error while running tauri application")
        .run(move |_app_handle, event| {
            if let RunEvent::ExitRequested { .. } = event {
                // Child-Prozess beim Schließen killen
                if let Some(mut child) = child_process_clone.lock().unwrap().take() {
                    let _ = child.kill();
                }
            }
        });
}
