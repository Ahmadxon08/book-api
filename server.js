const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./database/db");
const bookRoutes = require("./routes/book.routes");
const adminRoutes = require("./routes/admin.routes");
const authRoutes = require("./routes/auth.routes");
const homeRoutes = require("./routes/home.routes");
const uplaodImageRoutes = require("./routes/image.routes");
const productRoutes = require("./routes/product.routes");

dotenv.config();
const app = express();
app.use(express.json());
connectDB();
app.use("/api", bookRoutes);
app.use("/home", homeRoutes);
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/image", uplaodImageRoutes);
app.use("/product", productRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
