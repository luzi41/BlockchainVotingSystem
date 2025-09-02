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
                
                // Überprüfe ob Next.js-Verzeichnis existiert
                let next_dir = std::path::Path::new("../nextFE/bvs");
                if !next_dir.exists() {
                    eprintln!("Next.js directory not found: {:?}", next_dir);
                    eprintln!("Current working directory: {:?}", std::env::current_dir().unwrap());
                    return Err("Next.js directory not found".into());
                }

                // Build nur wenn nötig (überspringe für jetzt zum Testen)
                println!("Skipping build for now - assuming it's already built");
                
                // Alternativ: Build mit mehr Debugging
                /*
                let build_result = Command::new("npm")
                    .args(&["run", "build"])
                    .current_dir("../nextFE/bvs")
                    .output();

                match build_result {
                    Ok(output) => {
                        if !output.status.success() {
                            eprintln!("Next.js build failed: {}", String::from_utf8_lossy(&output.stderr));
                            eprintln!("Build stdout: {}", String::from_utf8_lossy(&output.stdout));
                            return Err("Next.js build failed".into());
                        } else {
                            println!("Next.js build completed successfully");
                        }
                    }
                    Err(e) => {
                        eprintln!("Failed to run build command: {}", e);
                        return Err(format!("Build command failed: {}", e).into());
                    }
                }
                */

                // Server starten mit besserer Fehlerbehandlung
                println!("Starting Next.js server...");
                println!("Working directory: {:?}", std::env::current_dir().unwrap());
                println!("Next.js directory: {:?}", std::path::Path::new("../nextFE/bvs").canonicalize());

                // Überprüfe ob npm verfügbar ist
                let npm_check = Command::new("npm")
                    .args(&["--version"])
                    .output();

                match npm_check {
                    Ok(output) => {
                        println!("npm version: {}", String::from_utf8_lossy(&output.stdout));
                    }
                    Err(e) => {
                        eprintln!("npm not found: {}", e);
                        return Err("npm not available".into());
                    }
                }

                // Versuche verschiedene npm-Pfade
                let npm_commands = ["npm", "npm.exe", "npm.cmd"];
                let mut server_started = false;
                
                for npm_cmd in &npm_commands {
                    println!("Trying to start server with: {}", npm_cmd);
                    
                    let child_result = Command::new(npm_cmd)
                        .args(&["run", "start"])
                        .current_dir("../nextFE/bvs")
                        .stdout(Stdio::piped())
                        .stderr(Stdio::piped())
                        .spawn();

                    match child_result {
                        Ok(mut process) => {
                            println!("Server started successfully with {}", npm_cmd);
                            
                            // Überwache Server-Output
                            if let Some(stdout) = process.stdout.take() {
                                thread::spawn(move || {
                                    use std::io::{BufRead, BufReader};
                                    let reader = BufReader::new(stdout);
                                    for line in reader.lines() {
                                        if let Ok(line) = line {
                                            println!("Next.js stdout: {}", line);
                                        }
                                    }
                                });
                            }
                            
                            if let Some(stderr) = process.stderr.take() {
                                thread::spawn(move || {
                                    use std::io::{BufRead, BufReader};
                                    let reader = BufReader::new(stderr);
                                    for line in reader.lines() {
                                        if let Ok(line) = line {
                                            eprintln!("Next.js stderr: {}", line);
                                        }
                                    }
                                });
                            }

                            *child_process.lock().unwrap() = Some(process);
                            server_started = true;
                            break;
                        }
                        Err(e) => {
                            eprintln!("Failed to start server with {}: {}", npm_cmd, e);
                        }
                    }
                }

                if !server_started {
                    eprintln!("Could not start Next.js server with any npm command");
                    return Err("Failed to start Next.js server".into());
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