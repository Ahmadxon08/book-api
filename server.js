import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/db.js";
dotenv.config();
const app = express();
app.use(express.json());
connectDB();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
