const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorMiddleware");
require("dotenv").config();
require("colors");

const PORT = process.env.PORT || 5000;

const app = express();
connectDB();

// buit-in middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routers
app.use("/auth", require("./routes/auth"));
app.use("/user", require("./routes/user"));

// errorMiddleware
app.use(errorHandler);
// checking database connected and server running
mongoose.connection.once("open", () => {
  console.log("Database connected".green.underline);
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`.cyan.underline);
  });
});
