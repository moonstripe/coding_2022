struct User {
    name: String,
    favorite_food: String
}

fn build_user(name: String, favorite_food: String) -> User {
    User {
        name,
        favorite_food
    }
}

fn main() {
   println!("Hello, world!");
   let user1 = build_user("kojin".to_string(), "tiramisu".to_string());
   println!("{} built this simple application in Neovim. Their favorite food is {}", user1.name, user1.favorite_food);
}

