<div align="center">

<h1>📄 Quote-Scrape-Main</h1>

<p>
A full-stack web scraping application that extracts quotes, authors, and tags from a website and displays them in a structured dashboard with authentication and refresh functionality.
</p>

</div>

---

<h2>📌 Overview</h2>

<p>
Quote-Scrape-Main is a full-stack project that scrapes quotes from a target website using Cheerio and displays them in a modern dashboard. It includes authentication, data refresh, and timestamp tracking.
</p>

---

<h2>✨ Features</h2>

<ul>
  <li>🔐 User authentication (Login system using JWT)</li>
  <li>🕸️ Web scraping using Cheerio</li>
  <li>📜 Extract quotes, authors, and tags</li>
  <li>🔄 Refresh / re-fetch scraped data</li>
  <li>📊 Dashboard UI to display quotes</li>
  <li>⏱️ Last updated timestamp display</li>
  <li>📱 Responsive frontend UI</li>
</ul>

---

<h2>🛠️ Tech Stack</h2>

<h3>Backend</h3>
<ul>
  <li>Node.js</li>
  <li>Express.js</li>
  <li>Cheerio (Web Scraping)</li>
  <li>Axios</li>
  <li>JWT Authentication</li>
</ul>

<h3>Frontend</h3>
<ul>
  <li>React.js (ES Modules)</li>
  <li>Axios</li>
  <li>CSS / Tailwind (if used)</li>
</ul>

<h3>Database (optional)</h3>
<ul>
  <li>MongoDB (Mongoose)</li>
</ul>

---

<h2>📁 Project Structure</h2>

<pre>
Quote-Scrape-Main/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── scraper/
│   └── server.js
│
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── api/
│   └── App.jsx
</pre>

---

<h2>⚙️ Setup Instructions</h2>

<h3>1. Clone Repository</h3>

<pre>
git clone https://github.com/your-username/Quote-Scrape-Main.git
cd Quote-Scrape-Main
</pre>

---

<h3>2. Backend Setup</h3>

<pre>
cd backend
npm install
npm start
</pre>

<p>Create a <code>.env</code> file:</p>

<pre>
PORT=5000
JWT_SECRET=your_secret_key
MONGO_URI=your_mongodb_connection
</pre>

---

<h3>3. Frontend Setup</h3>

<pre>
cd frontend
npm install
npm run dev
</pre>

---

<h2>🔌 How It Works</h2>

<ul>
  <li>User logs in using JWT authentication</li>
  <li>Backend scrapes quotes from target website using Cheerio</li>
  <li>Extracted data is processed and sent to frontend</li>
  <li>Dashboard displays quotes in structured format</li>
  <li>User can refresh data to re-scrape latest quotes</li>
</ul>

---

<h2>📸 Screenshots</h2>

<p>(Add screenshots here)</p>
<ul>
  <li>Login Page</li>
  <li>Quotes Dashboard</li>
  <li>Refresh Feature</li>
</ul>

---

<h2>🚀 Future Improvements</h2>

<ul>
  <li>Pagination for quotes</li>
  <li>Filter by author and tags</li>
  <li>Automated scheduled scraping</li>
  <li>Save scraping history</li>
  <li>UI improvements for dashboard</li>
</ul>

---

<h2>👨‍💻 Author</h2>

<p>
<strong>Nirajan Lama</strong><br>
GitHub: <a href="https://github.com/nirajanlama2620" target="_blank">
github.com/nirajanlama2620
</a>
</p>

---

<div align="center">

<p>⭐ If you like this project, consider giving it a star!</p>

</div>
