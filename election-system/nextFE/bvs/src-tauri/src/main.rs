#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::process::{Child, Command, Stdio};
use std::sync::{Arc, Mutex};
use tauri::RunEvent;
use std::thread;
use std::time::Duration;

fn main() {
    let child_process: Arc<Mutex<Option<Child>>> = Arc::new(Mutex::new(None));
    let child_process_clone = Arc::clone(&child_process);

    tauri::Builder::default()
        .setup(move |_app| {
            #[cfg(not(debug_assertions))]
            {
                println!("Starting Next.js server in production mode...");
                
                // Erstelle das Build-Verzeichnis falls es nicht existiert
                let build_result = Command::new("npm")
                    .args(&["run", "build"])
                    .current_dir("/home/louis/Projekte/BlockchainVotingsSystem/election-system/nextFE/bvs")
                    .output();
                
                match build_result {
                    Ok(output) => {
                        if !output.status.success() {
                            eprintln!("Next.js build failed: {}", String::from_utf8_lossy(&output.stderr));
                            eprintln!("Build stdout: {}", String::from_utf8_lossy(&output.stdout));
                        } else {
                            println!("Next.js build completed successfully");
                        }
                    }
                    Err(e) => {
                        eprintln!("Failed to run build command: {}", e);
                    }
                }
                
                // Server starten
                println!("Starting Next.js server...");
                let child = Command::new("npm")
                    .args(&["run", "start"])
                    .current_dir("/home/louis/Projekte/BlockchainVotingsSystem/election-system/nextFE/bvs")
                    .stdout(Stdio::piped())
                    .stderr(Stdio::piped())
                    .spawn();

                match child {
                    Ok(mut process) => {
                        // Überwache Server-Output in separatem Thread
                        if let Some(stdout) = process.stdout.take() {
                            thread::spawn(move || {
                                use std::io::{BufRead, BufReader};
                                let reader = BufReader::new(stdout);
                                for line in reader.lines() {
                                    if let Ok(line) = line {
                                        println!("Next.js: {}", line);
                                    }
                                }
                            });
                        }

                        *child_process.lock().unwrap() = Some(process);
                        
                        // Warten bis Server bereit ist
                        println!("Waiting for server to start...");
                        thread::sleep(Duration::from_secs(8));
                        println!("Server should be ready now - opening window");
                    }
                    Err(e) => {
                        eprintln!("Failed to start Next.js server: {}", e);
                    }
                }
            }

            Ok(())
        })
        .build(tauri::generate_context!())
        .expect("error while running tauri application")
        .run(move |_app_handle, event| {
            if let RunEvent::ExitRequested { .. } = event {
                println!("Application closing - shutting down Next.js server...");
                if let Some(mut child) = child_process_clone.lock().unwrap().take() {
                    let _ = child.kill();
                    let _ = child.wait();
                    println!("Next.js server shut down.");
                }
            }
        });
}