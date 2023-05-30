use std::fs::File;
use std::io::prelude::*;

fn main() -> std::io::Result<()>{
    let mut f  = File::open("hello_world.txt").expect("Failed to open file");

    let mut contents = String::new();
    f.read_to_string(&mut contents)?;

    println!("contents: {:?}", contents);
    Ok(())
}