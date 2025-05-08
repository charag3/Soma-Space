const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

// URL de tu portafolio
const BEHANCE_URL = "https://www.behance.net/kreatuagency";

(async () => {
  try {
    const { data: html } = await axios.get(BEHANCE_URL, {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    const $ = cheerio.load(html);
    const projects = [];

    $("a[href^='/gallery/']").each((i, el) => {
      const href = $(el).attr("href");
      const title = $(el).find("div.ProjectCoverNeue-title").text().trim();
      const img = $(el).find("img").attr("src");

      if (href && title && img) {
        projects.push({
          title,
          url: `https://www.behance.net${href}`,
          image: img,
        });
      }
    });

    // Guardar archivo JSON
    fs.writeFileSync(
      "behance_projects.json",
      JSON.stringify(projects, null, 2),
      "utf8",
    );

    console.log(
      `✅ ${projects.length} proyectos guardados en behance_projects.json`,
    );
  } catch (err) {
    console.error("❌ Error al scrapear Behance:", err.message);
  }
})();
