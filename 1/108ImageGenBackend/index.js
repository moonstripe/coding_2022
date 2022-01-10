require('dotenv').config();
const { ImageBot } = require('./imageBot');
const { TwitterApi } = require('twitter-api-v2');
const client = new TwitterApi({
    appKey: process.env.TW_API_KEY,
    appSecret: process.env.TW_API_SECRET,
    accessToken: process.env.TW_ACCESS_TOKEN,
    accessSecret: process.env.TW_TOKEN_SECRET,
});

const imgbot = new ImageBot(client);

// imgbot.run();