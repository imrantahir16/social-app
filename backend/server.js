const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const corsOption = require("./config/corsOption");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorMiddleware");
require("dotenv").config();
require("colors");

const PORT = process.env.PORT || 5000;

const app = express();
connectDB();

// cors
app.use(cors(corsOption));
// static file
app.use("/images", express.static(path.join(__dirname, "public/images")));

// buit-in middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "public/images");
  },
  filename: (req, file, callback) => {
    callback(null, req.body.name);
  },
});

const upload = multer({ storage });

// routers
app.use("/auth", require("./routes/auth"));
app.use("/user", require("./routes/user"));
app.use("/post", require("./routes/post"));

app.use("/upload", upload.single("file"), (req, res) => {
  try {
    res.status(200).json("File upload successful");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// errorMiddleware
app.use(errorHandler);
// checking database connected and server running
mongoose.connection.once("open", () => {
  console.log("Database connected".green.underline);
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`.cyan.underline);
  });
});
