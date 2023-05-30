use traits::{Summary, Tweet};

fn returns_summarizable() -> impl Summary {
    Tweet {
        username: String::from("kojinglick"),
        content: String::from("it's kojin!"),
        reply: false,
        retweet: false,
    }
}

fn main() {
    let tweet = Tweet {
        username: String::from("moonstripe_____"),
        content: String::from("Hello World!"),
        reply: false,
        retweet: false,
    };

    println!("1 new tweet: {}", tweet.summarize());

    returns_summarizable();
}