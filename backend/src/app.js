import dns from 'node:dns';
dns.setServers(['8.8.8.8', '1.1.1.1']);

import express from 'express';
import cors from 'cors';

import authRoutes from './routes/auth.routes.js';
import quotesRoutes from "./routes/quotes.routes.js";

const app = express();

app.use(cors());
app.use(express.json());


app.use("/api/auth", authRoutes);  // auth system
app.use("/api/quotes", quotesRoutes);  // scraper system

export default app;