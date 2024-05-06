use serialport::*;
use std::time::Duration;

#[derive(Clone, serde::Serialize)]
struct Payload {
    message: String,
}

// list the ports and return a vector of strings
pub fn list_ports() -> Vec<String> {
    // get the ports from serialport::available_ports()
    let ports = serialport::available_ports().expect("No ports found!");
    // make a vecotor of strings then create an iterator of ports then map port names an clone
    // and collect them into the vector
    let port_list: Vec<String> = ports.iter().map(|p| p.port_name.clone()).collect();
    // return tfhe ports list
    return port_list;
}

// try to init the serial and return the port
pub fn init_port(port_path: String, baud_rate: u32) -> Result<Box<dyn SerialPort>> {
    println!("Opening port: {}, baud: {}", port_path, baud_rate);
    let port = serialport::new(port_path, baud_rate)
        .timeout(Duration::from_millis(10))
        .open()?;

    // return port
    return Ok(port);
}
