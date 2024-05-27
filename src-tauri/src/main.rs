#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::sync::{
    atomic::{AtomicBool, Ordering},
    Arc, Mutex,
};

use serialport::SerialPort;
use tauri::{Manager, State};
mod serial_wrapper;

pub struct Device {
    port_path: String,
    baud_rate: u32,
}

pub struct Data {
    port: Option<Box<dyn SerialPort>>,
    port_items: Device,
    is_thread_open: Arc<AtomicBool>,
}
pub struct AppData(Mutex<Data>);

#[tauri::command]
fn get_ports() -> Vec<String> {
    return serial_wrapper::list_ports();
}

#[tauri::command]
fn handle_serial_connect(app: tauri::AppHandle) -> bool {
    let app_clone = app.clone();
    let state = app_clone.state::<AppData>();
    let mut state_guard = state.0.lock().unwrap();

    match &state_guard.port {
        Some(_) => {
            println!("Killing thread");
            state_guard.is_thread_open.store(false, Ordering::Relaxed);
            while !state_guard.is_thread_open.load(Ordering::Relaxed) {}
            state_guard.port = None;
            return false;
        }
        None => {
            let port = serial_wrapper::init_port(
                state_guard.port_items.port_path.to_string(),
                state_guard.port_items.baud_rate,
            );
            match port {
                Ok(port) => {
                    let port_clone = port.try_clone().expect("Couldn't clone port");
                    state_guard.port = Some(port);
                    let is_thread_open_ref = state_guard.is_thread_open.clone();
                    serial_wrapper::start_clone_thread(app.clone(), port_clone, is_thread_open_ref);
                }
                Err(e) => {
                    let error_description = format!("{}{}", "An error occured opening port: ", e);
                    rfd::MessageDialog::new()
                        .set_level(rfd::MessageLevel::Error)
                        .set_title("Port Error")
                        .set_description(error_description.as_str())
                        .set_buttons(rfd::MessageButtons::Ok)
                        .show();

                    return false;
                }
            }
        }
    }
    return true;
}

#[tauri::command]
fn set_port_items(state: State<AppData>, port: &str, baudrate: &str) {
    let mut state_guard = state.0.lock().unwrap();

    state_guard.port_items = Device {
        port_path: port.to_string(),
        baud_rate: baudrate.to_string().parse::<u32>().unwrap(),
    };
}

#[tauri::command]
fn emit_error(input: String) {
    rfd::MessageDialog::new()
        .set_level(rfd::MessageLevel::Error)
        .set_title("Port Error")
        .set_description(input.as_str())
        .set_buttons(rfd::MessageButtons::Ok)
        .show();
}

fn main() {
    tauri::Builder::default()
        .manage(AppData(Mutex::new(Data {
            port: None,
            port_items: Device {
                port_path: String::from(""),
                baud_rate: 0,
            },
            is_thread_open: Arc::new(AtomicBool::new(true)),
        })))
        .invoke_handler(tauri::generate_handler![
            get_ports,
            handle_serial_connect,
            set_port_items,
            emit_error
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
