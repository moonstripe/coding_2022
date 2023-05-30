// most of the code from the "largest" functions are the same. let's add generic typing

// fn largest_i32(list: &[i32]) -> i32 {
//     let mut largest = list[0];

//     for &number in list {
//         if number > largest {
//             largest = number;
//         }
//     }

//     largest
// }

// fn largest_char(list: &[char]) -> char {
//     let mut largest = list[0];

//     for &number in list {
//         if number > largest {
//             largest = number;
//         }
//     }

//     largest
// }

fn largest<T>(list: &[T]) -> T {
    let mut largest = list[0];

    for &item in list {
        if item > largest {
            // comparison operator doesn't work with all types... More on this from std::cmp::PartialOrd
            largest = item;
        }
    }

    largest
}

fn main() {
    let number_list = vec![34, 50, 25, 100, 65];

    let result = largest(&number_list);
    println!("The largest number is {}", result);

    let char_list = vec!['y', 'm', 'a', 'c'];

    let result = largest(&char_list);
    println!("The largest char is {}", result)
}