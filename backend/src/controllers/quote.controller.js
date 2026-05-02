// import { loginAndScrape, getDemoQuotes } from "../services/scraper.service.js";
import { loginAndScrape } from "../services/scraper.service.js";

// ─────────────────────────────────────────────
//  DEMO DATA (Single Source of Truth)
// ─────────────────────────────────────────────
function getDemoQuotes() {
  return [
    {
      text: "“You only live once, but if you do it right, once is enough.”",
      author: "Mae West",
      authorUrl: `${BASE_URL}/author/Mae-West`,
      tags: ["life"],
    },
  ];
}

export const getQuotes = async (req, res) => {
  try {
    const quotes = await loginAndScrape();
    res.status(200).json({
      success: true,
      source: "live",
      quotes,
      lastUpdated: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Scraper Error:", error.message);

    res.status(200).json({
      success: true,
      source: "demo",
      quotes: getDemoQuotes(),
      lastUpdated: new Date().toISOString(),
      warning: error.message,
    });
  }
};