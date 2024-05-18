// Prevents additional console window on Windows in release, DO NOT REMOVE!!
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
    // todo track currect menu itmes
}
pub struct AppData(Mutex<Data>);

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn get_ports() -> Vec<String> {
    return serial_wrapper::list_ports();
}

#[tauri::command]
fn handle_serial_connect(app: tauri::AppHandle) -> bool {
    // clone the app
    let app_clone = app.clone();
    // get the state
    let state = app_clone.state::<AppData>();
    // unlock gaurd
    let mut state_guard = state.0.lock().unwrap();

    // check port
    match &state_guard.port {
        // if port exists
        Some(_) => {
            // anounce killing the thread
            println!("Killing thread");
            // kill thread
            state_guard.is_thread_open.store(false, Ordering::Relaxed);
            // wait for change
            while !state_guard.is_thread_open.load(Ordering::Relaxed) {}
            // set the port as an none
            state_guard.port = None;
            return false;
        }
        // start new port
        None => {
            // start new port TODO make it not really long
            let port = serial_wrapper::init_port(
                state_guard.port_items.port_path.to_string(),
                state_guard.port_items.baud_rate,
            );
            // check port success
            match port {
                Ok(port) => {
                    // store report
                    let port_clone = port.try_clone().expect("Couldn't clone port");
                    // store the port
                    state_guard.port = Some(port);
                    // clone the thread handle (copys a refrence)
                    let is_thread_open_ref = state_guard.is_thread_open.clone();
                    // use clone on thread
                    serial_wrapper::start_clone_thread(app.clone(), port_clone, is_thread_open_ref);
                }
                Err(e) => {
                    let error_description = format!("{}{}", "An error occured opening port: ", e);
                    rfd::MessageDialog::new()
                        .set_level(rfd::MessageLevel::Error) // Set the message level to indicate an error
                        .set_title("Port Error")
                        .set_description(error_description.as_str())
                        .set_buttons(rfd::MessageButtons::Ok) // Use OkCancel buttons
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
    // unlock guard
    let mut state_guard = state.0.lock().unwrap();

    // store port items
    // TODO change ending to update without port init
    state_guard.port_items = Device {
        port_path: port.to_string(),
        baud_rate: baudrate.to_string().parse::<u32>().unwrap(),
    };
}

#[tauri::command]
fn emit_error(input: String) {
    rfd::MessageDialog::new()
        .set_level(rfd::MessageLevel::Error) // Set the message level to indicate an error
        .set_title("Port Error")
        .set_description(input.as_str())
        .set_buttons(rfd::MessageButtons::Ok) // Use OkCancel buttons
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
