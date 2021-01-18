import { chromium } from "playwright";
import { open, write } from "fs/promises";
import { join } from "path";

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto("https://google.com/");
  const results = await page.$$("body");

  const outputFile = await open(join(__dirname, "..", "output.json"), "w");
  await write(
    outputFile,
    JSON.stringify(
      results.map((r) => r.textContent),
      null,
      2
    )
  );

  await browser.close();
}

main().then(() => {
  console.log("done");
});
