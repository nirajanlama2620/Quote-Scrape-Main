import axios from "axios";
import * as cheerio from "cheerio";

const BASE_URL = "https://quotes.toscrape.com";

// simple cache (optional but useful)
let cache = null;
let lastFetch = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// ─────────────────────────────────────────────
//  LIVE SCRAPER
// ─────────────────────────────────────────────
export async function loginAndScrape() {
  const now = Date.now();

  //  Return cached data if still fresh
  if (cache && now - lastFetch < CACHE_DURATION) {
    return cache;
  }

  // Step 1: Get login page (for CSRF + initial cookie)
  const loginPageRes = await axios.get(`${BASE_URL}/login`);

  const $login = cheerio.load(loginPageRes.data);
  const csrfToken = $login('input[name="csrf_token"]').val();

  if (!csrfToken) throw new Error("CSRF token not found");

  const initialCookie = (loginPageRes.headers["set-cookie"] || [])
    .map((c) => c.split(";")[0])
    .join("; ");

  // Step 2: Perform login
  const loginRes = await axios.post(
    `${BASE_URL}/login`,
    new URLSearchParams({
      csrf_token: csrfToken,
      username: "admin",
      password: "admin",
    }).toString(),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Cookie: initialCookie,
        Referer: `${BASE_URL}/login`,
      },
    }
  );

  //  IMPORTANT: get updated session cookie after login
  const authCookie = (loginRes.headers["set-cookie"] || [])
    .map((c) => c.split(";")[0])
    .join("; ") || initialCookie;

  const quotes = [];
  let page = 1;
  const MAX_PAGES = 10;

  // Step 3: Scrape pages
  while (page <= MAX_PAGES) {
    const res = await axios.get(`${BASE_URL}/page/${page}/`, {
      headers: { Cookie: authCookie },
    });

    const $ = cheerio.load(res.data);
    const items = $(".quote");

    if (items.length === 0) break;

    items.each((_, el) => {
      const text = $(el).find(".text").text().trim();
      const author = $(el).find(".author").text().trim();
      const authorUrl =
        BASE_URL + $(el).find("span a").attr("href");

      const tags = [];
      $(el)
        .find(".tags .tag")
        .each((_, tag) => {
          tags.push($(tag).text().trim());
        });

      quotes.push({ text, author, authorUrl, tags });
    });

    if ($("li.next").length === 0) break;
    page++;
  }

  // Save to cache
  cache = quotes;
  lastFetch = now;

  return quotes;
}
