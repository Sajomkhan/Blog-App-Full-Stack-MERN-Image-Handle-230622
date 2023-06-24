require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const connectDB = require('./db/connection');

const postRouter = require("./routes/post.route");
const userRouter = require("./routes/user.route");

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

const PORT = process.env.PORT || 5000;
connectDB()

app.use("/api/post", postRouter)
app.use("/api/user", userRouter)

app.listen(PORT, () => {
  console.log(`app is running on http://localhost:${PORT}`);
});
