use sentiment;

fn main() {
    let analysis_one = sentiment::analyze("I love this class, but I think it's very bad for all things".to_string());

    println!("positive: {} \nnegative: {}", analysis_one.positive.score, analysis_one.negative.score)
}
