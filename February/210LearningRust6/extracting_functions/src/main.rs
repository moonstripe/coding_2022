fn largest(list: &[i32]) -> i32 {
    let mut largest = list[0];

    for &number in list {
        if number > largest {
            largest = number;
        }
    }

    largest
}

fn main() {
    // tedious and error prone duplication of code... 
    // let number_list = vec![34, 50, 25, 100, 65];

    // let mut largest = number_list[0];

    // for number in number_list {
    //     if number > largest {
    //         largest = number;
    //     }
    // }

    // println!("The largest number is {}", largest);

    // let number_list = vec![32, 24342, 234342, 32456, 35723];

    // let mut largest = number_list[0];

    // for number in number_list {
    //     if number > largest {
    //         largest = number;
    //     }
    // }

    // println!("The largest number is {}", largest)

    // instead, use function for duplicate code (above)

    let number_list = vec![34, 50, 25, 100, 65];

    let result = largest(&number_list);
    println!("The largest number is {}", result);

    let number_list = vec![645, 48, 6894, 4567, 345];

    let result = largest(&number_list);
    println!("The largest number is {}", result)

}
