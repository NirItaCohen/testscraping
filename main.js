import puppeteer from "puppeteer";

const ynetData = {
  mainArticle: {
    title: "",
    subTitle: "",
    link: "",
    screenshot: "",
    paragraphs: [],
  },
};

const scrapeWalla = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://www.walla.co.il/");
  const firstArticle = await page.$(".main-item");

  const screenshot = await page.screenshot({ path: "walla.png" });
  await browser.close();
};

const scrapeYnet = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://www.ynet.co.il/home/0,7340,L-8,00.html");

  const firstArticle = await page.$('[data-tb-region="Top story"]');
  const mainArticleTitle = await firstArticle.$eval("h1", (el) => el.innerText);
  const mainArticleSubTitle = await firstArticle.$eval(
    ".slotSubTitle",
    (el) => el.innerText
  );

  const screenshot = await page.screenshot({
    path: "ynet.png",
    fullPage: true,
  });

  await browser.close();
};

scrapeYnet();
