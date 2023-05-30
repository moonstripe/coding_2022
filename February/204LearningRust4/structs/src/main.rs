fn main() {

    let mut user1 = User {
        email: String::from("someone@exammple.com"),
        username: String::from("someusername123"),
        active: false,
        sign_in_count: 0
    };

    println!("{} has signed on {} times.", user1.email, user1.sign_in_count);

    let user2 = User {
        email: String::from("another@example.com"),
        ..user1
    };

    println!("{} has signed on {} times.", user2.email, user2.sign_in_count);

}

struct User {
    active: bool,
    username: String,
    email: String,
    sign_in_count: u64,
}

fn build_user( email: String, username: String ) -> User {
    User {
        email,
        username,
        active: true,
        sign_in_count: 1,
    }
}