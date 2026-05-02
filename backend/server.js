import dotenv from "dotenv";
import app from './src/app.js';
import { connectDB } from "./src/db/db.js";

dotenv.config();

const PORT = process.env.PORT;
// const __dirname = path.resolve();

app.listen(PORT, () => {
    console.log("server is running on port:" + PORT);
    connectDB();
})