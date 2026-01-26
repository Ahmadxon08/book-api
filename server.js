const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./database/db");
const bookRoutes = require("./routes/book.routes");

dotenv.config();
const app = express();
app.use(express.json());
connectDB();
app.use("/api", bookRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
