import { chromium } from "playwright";
import fs from "fs";

const BEHANCE_URL = "https://www.behance.net/kreatuagency";

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(BEHANCE_URL, { waitUntil: "networkidle" });

  // Espera a que los proyectos se carguen
  await page.waitForSelector("a[href^='/gallery/']");

  const projects = await page.$$eval("a[href^='/gallery/']", (elements) => {
    const seen = new Set();
    return elements
      .map((a) => {
        const href = a.getAttribute("href");
        const title = a.querySelector("div")?.textContent?.trim();
        const img = a.querySelector("img")?.src;

        if (href && title && img && !seen.has(href)) {
          seen.add(href);
          return {
            title,
            url: "https://www.behance.net" + href,
            image: img,
          };
        }
        return null;
      })
      .filter((x) => x);
  });

  fs.writeFileSync("behance_projects.json", JSON.stringify(projects, null, 2));
  console.log(`✅ ${projects.length} proyectos guardados`);

  await browser.close();
})();
