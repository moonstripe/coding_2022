const
    fs = require("fs"),
    { createCanvas } = require("canvas");

class ImageBot {
    constructor(client) {
        this.twClient = client;
        this.imgRef;
        this.imgBuffer;
        this.text
    }

    generateText = () => {
        this.text = 'hello world'
    }

    generateImg = () => {
        const WIDTH = 1200;
        const HEIGHT = 675;

        const canvas = createCanvas(WIDTH, HEIGHT);
        const ctx = canvas.getContext("2d");

        ctx.fillStyle = "#222222";
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
        ctx.fillStyle = "#f2f2f2";
        ctx.font = "32px Arial";
        ctx.fillText("Hello", 13, 35);

        const buffer = canvas.toBuffer("image/png");
        const timestamp = parseInt((new Date().getTime() / 1000).toFixed(0));

        const fileString = `images/${timestamp}.png`

        fs.writeFileSync(fileString, buffer);

        this.imgRef = fileString
        this.imgBuffer = buffer
    }

    postToTwitter = async () => {
        const imgToPost = await this.twClient.v1.uploadMedia(this.imgRef);
        const post = await this.twClient.v1.tweet(this.text ? this.text : '', { media_ids: imgToPost});

        console.log('successfully posted', post.id_str)

    }

    run = async () => {

        // reset post fields

        this.imgBuffer = new Buffer.from('')
        this.imgRef = '';
        this.text = '';


        this.generateText();
        this.generateImg();
        await this.postToTwitter();
    }
}

module.exports = {
    ImageBot
}