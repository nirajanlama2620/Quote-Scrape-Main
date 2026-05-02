This system is built using MongoDB, Express.js, Node.js for the backend, and React (ES Modules) for the frontend. I also used Cheerio for web scraping and JWT for authentication.

After the user logs in, the system securely generates a token using JWT. Once authenticated, the system extracts quotes and their authors from a website using Cheerio.

The data are displayed on a simple dashboard in the frontend.

The dashboard shows:

Quotes and their authors
A refresh button to re-fetch updated data
The last updated time, so users know when the data was last fetched

When the user clicks refresh, the system scrapes the data again, updates the database, and refreshes the UI.
