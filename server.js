const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./database/db");
const bookRoutes = require("./routes/book.routes");
const authRoutes = require("./routes/auth.routes");

dotenv.config();
const app = express();
app.use(express.json());
connectDB();
app.use("/api", bookRoutes);
app.use("/auth", authRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
