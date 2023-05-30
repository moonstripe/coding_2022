import puppeteer from "puppeteer";


const browser = await puppeteer.launch({
    defaultViewport: {
        width: 2560,
        height: 1600,
        isMobile: false,
        hasTouch: false,
        isLandscape: true
    }
});
const page = await browser.newPage();

const domain = "kojinglick.com"

await page.goto(`http://${domain}`)

const metrics = await page.metrics();

console.log('Metrics:', metrics)

await page.screenshot({
    path: domain + ".png",
    fullPage: true
})

await browser.close();
