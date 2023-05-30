use futures::prelude::*;
use twitter_stream::{Token, TwitterStream};
use serde::{Deserialize, Serialize};
use serde_json;
use vader_sentiment::SentimentIntensityAnalyzer;

#[derive(Debug, Serialize, Deserialize)]
struct User {
    created_at: String,
    id: i64,
    name: String,
    screen_name: String
}

#[derive(Debug, Serialize, Deserialize)]
struct DeserializedTweet {
    created_at: String,
    id: i64,
    text: String,
    lang: String,
    user: User
}

#[derive(Debug, Serialize, Deserialize)]
struct SentimentTweet {
    tweet: DeserializedTweet,
    composite: f64,
    positive: f64,
    negative: f64,
    neutral: f64
}

fn build_sentiment_tweet(tweet: DeserializedTweet, composite: f64, positive: f64, negative: f64, neutral: f64) -> SentimentTweet {
    SentimentTweet { 
        tweet, 
        composite, 
        positive, 
        negative, 
        neutral 
    }
}

#[tokio::main]
async fn main() {
    let analyzer = SentimentIntensityAnalyzer::new();
    let token = Token::from_parts(
        "a279S6FkWRxirLgNruhossPL2", 
        "KqgKvD8pGdutPWf08MCVPegUgxNVnw9ePIB0NRyHcXx7UtePFH", 
        "367954146-vDbPNZauyGLkWbSpDmXEUgwNiFML6HcpAN8wrASz", 
        "uI2mQcIpjsvRxfUhwsm227mp1iH8wNtFpzcFpdiC1MvbH"
    );

    let mut cumulative_sentiment: f64 = 0.0;
    let mut tweet_num: f64 = 0.0;

    println!("starting TwitterStream");

    TwitterStream::track("Elon", &token)
        .try_flatten_stream()
        .try_for_each(|json| {

            let de_tweet: DeserializedTweet = serde_json::from_str(&json).unwrap();

            if de_tweet.lang == "en" {

                tweet_num = tweet_num + 1.;

                let polarity_scores = analyzer.polarity_scores(&de_tweet.text);

                let sentiment_tweet: SentimentTweet = build_sentiment_tweet(de_tweet, polarity_scores["compound"], polarity_scores["pos"], polarity_scores["neg"], polarity_scores["neu"]);

                cumulative_sentiment = cumulative_sentiment + polarity_scores.get("compound").unwrap();

                println!("{:#?}", sentiment_tweet);
                println!("average sentiment: {:#?}", cumulative_sentiment/tweet_num);
                println!("tweets: {:#?}", tweet_num);

            }
            future::ok(())
        })
        .await
        .unwrap();

    }