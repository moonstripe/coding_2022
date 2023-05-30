#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use std::net::Ipv4Addr;
use std::process::Command;

#[tauri::command]
fn run_nmap(ip: String) -> String {
    // let true_ip = match ip.parse::<Ipv4Addr>() {
    //     Ok(true_ip) => true_ip,
    //     Err(e) => panic!("{}", e)
    // };

    let response = match Command::new("nmap").arg(format!("{}", ip)).arg("-T4").output() {
        Ok(response) => response,
        Err(e) => panic!("{}", e)
    };

    format!("the output is {:?}", response)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![run_nmap])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
