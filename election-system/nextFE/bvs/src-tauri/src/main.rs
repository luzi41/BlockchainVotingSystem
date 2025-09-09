#![cfg_attr(all(not(debug_assertions), target_os = "windows"), windows_subsystem = "windows")]

use serde::{Deserialize, Serialize};
use std::path::{Path, PathBuf};
use tauri::{State, Emitter, Window};
use tokio::sync::RwLock;
use tokio::fs;

// -------------------- Settings Struct --------------------
#[derive(Debug, Clone, Serialize, Deserialize)]
struct AppSettings {
    election_district: String,
    rpc_url: String,
    contract_address: String,
    language: String,
    private_key: String,
}

impl Default for AppSettings {
    fn default() -> Self {
        AppSettings {
            election_district: "1".into(),
            rpc_url: "http://127.0.0.1:8545".into(),
            contract_address: "0x0000000000000000000000000000000000000000".into(),
            language: "de".into(),
            private_key: "0x0000000000000000000000000000000000000000".into(),
        }
    }
}

// -------------------- State --------------------
struct AppState {
    settings: RwLock<AppSettings>,
}

// -------------------- Settings Helper --------------------
fn settings_file_path() -> PathBuf {
    let mut path = dirs::config_dir().unwrap_or_else(|| PathBuf::from("."));
    path.push("BVS");
    path.push("settings.json");
    path
}

async fn load_settings_from_file() -> AppSettings {
    let path = settings_file_path();
    if path.exists() {
        match fs::read_to_string(&path).await {
            Ok(contents) => {
                let mut parsed: AppSettings = match serde_json::from_str(&contents) {
                    Ok(p) => p,
                    Err(e) => {
                        eprintln!("⚠️ Fehler beim Parsen der Settings: {e}");
                        return AppSettings::default();
                    }
                };

                // Migration: falls private_key leer ist, Standardwert setzen
                if parsed.private_key.is_empty() {
                    parsed.private_key = "0x0000000000000000000000000000000000000000".into();
                }

                return parsed;
            }
            Err(e) => eprintln!("⚠️ Fehler beim Lesen von {:?}: {e}", path),
        }
    }
    AppSettings::default()
}

async fn save_settings_to_file(settings: &AppSettings) -> Result<(), String> {
    let path = settings_file_path();
    let parent = path.parent().unwrap_or(Path::new("."));
    if !parent.exists() {
        fs::create_dir_all(parent)
            .await
            .map_err(|e| e.to_string())?;
    }
    let json = serde_json::to_string_pretty(settings).map_err(|e| e.to_string())?;
    fs::write(path, json).await.map_err(|e| e.to_string())
}

// -------------------- Commands --------------------
#[tauri::command]
async fn get_all_settings(state: State<'_, AppState>) -> Result<AppSettings, String> {
    let settings = state.settings.read().await;
    Ok(settings.clone())
}

#[tauri::command]
async fn update_all_settings(state: State<'_, AppState>, new_settings: AppSettings) -> Result<(), String> {
    let mut settings = state.settings.write().await;
    *settings = new_settings;
    save_settings_to_file(&*settings).await
}

#[tauri::command]
fn navigate_to(window: Window, path: String) -> Result<(), String> {
    window.emit("navigate", path).map_err(|e| e.to_string())
}

// -------------------- Main --------------------
#[tokio::main]
async fn main() {
    let initial_settings = load_settings_from_file().await;

    tauri::Builder::default()
        .manage(AppState {
            settings: RwLock::new(initial_settings),
        })
        .invoke_handler(tauri::generate_handler![
            get_all_settings,
            update_all_settings,
            navigate_to
        ])
        .run(tauri::generate_context!())
        .expect("❌ Fehler beim Starten der Tauri-Anwendung");
}
