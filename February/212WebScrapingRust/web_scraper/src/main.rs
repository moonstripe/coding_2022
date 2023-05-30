use reqwest;
use scraper::{Html, Selector};
use std::{fs::{File}, path::Path, io::Write};

#[tokio::main]
async fn main() -> std::io::Result<()> {
    let link = String::from("https://en.wikipedia.org/wiki/Europa_(moon)");
    let sel = String::from("p");
    let (count, matches) = parser(&link, &sel).await;

    println!("Found {:?} {:?} elements!", count, sel);
    println!("{:?} are the contents of this query", matches);

    // write to file

    let suffix = String::from(".txt");

    let mut file_name_string = String::from("");

    file_name_string.push_str(&link);
    file_name_string.push_str(&suffix);

    println!("filename {}", file_name_string);

    let path = Path::new(&file_name_string);
    let mut file = File::create(file_name_string.replace("/", ""))?;

    file.write_all(matches.as_bytes())?;

    Ok(())
}

async fn parser(link: &String, sel: &String) -> (i32, String) {
    // chaining .await will yield our query result
    let text = reqwest::get(link).await.unwrap().text().await.unwrap();

    let document = Html::parse_document(&text);
    // println!("{:?}", document);

    let selector = Selector::parse(sel).unwrap();

    let mut count = 0;
    let mut matches: Vec<String> = Vec::new();

    for element in document.select(&selector) {
        // let e: String = element.inner_html();
        let e = element.text().collect::<Vec<_>>();

        // for text in e {
        //     // let cleaned = e.trim_end().trim_start().replace("\n", " ").to_string();
        // }

        matches.push(e.join(""));

        count += 1;
        // println!("Found {:?}.", text)
    }

    //  create a function to clean the string

    (
        count,
        matches.join("").trim_end().trim_start().replace("\n", " "),
    )
}
