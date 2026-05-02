import express from "express";
import { getQuotes } from "../controllers/quote.controller.js";

const router = express.Router();

router.get("/", getQuotes);

export default router;