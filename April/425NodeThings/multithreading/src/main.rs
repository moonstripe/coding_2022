use std::mem;
use std::thread;
use std::sync::mpsc;

fn main() {
    let (sender, receiver) = mpsc::channel();
    for i in 0..10 {
        let sender = sender.clone();
        thread::spawn(move|| {

            sender.send(i).unwrap();
            println!("Sent: {}", i);
        });
    }

    // drop the original sender
    mem::drop(sender);

    for received in receiver {
        println!("Got: {}", received);
    }
}