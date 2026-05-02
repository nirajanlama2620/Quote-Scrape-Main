import { loginAndScrape } from "../scrapers/quoteScraper.js";
import { getDemoQuotes } from "../utils/demoQuotes.js";

export async function fetchQuotes() {
  try {
    const quotes = await loginAndScrape();

    return {
      source: "live",
      quotes,
    };
  } catch (err) {
    return {
      source: "demo",
      quotes: getDemoQuotes(),
      error: err.message,
    };
  }
}