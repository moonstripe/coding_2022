// fn main() {
//     let mut s = String::from("hello world");

//     let word = first_word(&s);

//     s.clear();

//     println!("{}", word);

// }

// fn first_word( s: &String ) -> usize {
//     let bytes = s.as_bytes();

//     for (i, &item) in bytes.iter().enumerate() {
//         if item == b' ' {
//             return i;
//         }
//     }

//     s.len()
// }

fn main() {
    let mut s = String::from("hello world");

    let word = first_word(&s);

    s.clear();

    println!("{}", word);
}

// first word now returns a slice

fn first_word( s: &String ) -> &str {
    let bytes = s.as_bytes();
    for (i, &item) in bytes.iter().enumerate() {
        if item == b' ' {
            return &s[..i]
        }
    }

    &s[..]
}