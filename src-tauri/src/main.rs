// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
mod serial_wrapper;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn get_ports() -> Vec<String> {
    return serial_wrapper::list_ports();
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_ports])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
