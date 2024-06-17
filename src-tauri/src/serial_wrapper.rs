use serialport::*;
use std::sync::{
    atomic::{AtomicBool, Ordering},
    Arc,
};
use std::time::Duration;
use std::{io, thread};
use tauri::Manager;

#[derive(Clone, serde::Serialize)]
struct Payload {
    message: String,
}

pub fn list_ports() -> Vec<String> {
    let ports = serialport::available_ports().expect("No ports found!");
    let port_list: Vec<String> = ports.iter().map(|p| p.port_name.clone()).collect();
    return port_list;
}

pub fn init_port(port_path: String, baud_rate: u32) -> Result<Box<dyn SerialPort>> {
    println!("Opening port: {}, baud: {}", port_path, baud_rate);
    let port = serialport::new(port_path, baud_rate)
        .timeout(Duration::from_millis(10))
        .open()?;
    return Ok(port);
}

pub fn start_clone_thread(
    app: tauri::AppHandle,
    mut port_clone: Box<dyn SerialPort>,
    is_thread_open: Arc<AtomicBool>,
) {
    thread::spawn(move || {
        is_thread_open.store(true, Ordering::Relaxed);
        println!("Thread spawned");
        while is_thread_open.load(Ordering::SeqCst) {
            let mut received_data = String::new();
            loop {
                let mut byte = [0; 1];
                match port_clone.read(&mut byte) {
                    Ok(size) => {
                        if size > 0 {
                            received_data.push(byte[0] as char);
                            if received_data.ends_with('\n') {
                                let data_str = received_data.trim_end_matches('\n').to_string();
                                //println!("Received: {}", data_str);
                                received_data.clear();
                                app.emit_all("updateSerial", Payload { message: data_str })
                                    .unwrap();
                            }
                        }
                    }
                    Err(ref e) if e.kind() == io::ErrorKind::TimedOut => (),
                    Err(_e) => {
                        let app_clone = app.clone();
                        use crate::AppData;
                        let state = app_clone.state::<AppData>();
                        let mut state_guard: std::sync::MutexGuard<crate::Data> = state.0.lock().unwrap();
                        state_guard.port = None;

                        is_thread_open.store(false, Ordering::Relaxed);
                        app.emit_all(
                            "isConnected",
                            Payload {
                                message: "disconnected".to_string(),
                            },
                        )
                        .unwrap();
                        break;
                    }
                }
                if !is_thread_open.load(Ordering::SeqCst) {
                    break;
                }
            }
        }
        println!("Terminating no record thread and now enabling...");
        is_thread_open.store(true, Ordering::Relaxed);
    });
}
