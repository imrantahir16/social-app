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
const socketIO = require("socket.io");
const http = require("http");
const {
  users,
  addUser,
  removeUser,
  getUser,
} = require("./utils/socketFunctions");
require("dotenv").config();
require("colors");

const app = express();
connectDB();
// cors
app.use(cors(corsOption));

const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "*",
  },
});
const PORT = process.env.PORT || 5000;

// static file
app.use("/", express.static(path.join(__dirname, "/public")));
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
app.use("/post", require("./routes/post"));
app.use("/user", require("./routes/user"));
app.use("/messages", require("./routes/message"));
app.use("/conversations", require("./routes/conversation"));

app.use("/upload", upload.single("file"), (req, res) => {
  try {
    res.status(200).json("File upload successful");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// socket io events
io.on("connection", (socket) => {
  console.log(`connected`);

  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  socket.on("sendMessage", ({ senderId, recieverId, text }) => {
    const user = getUser(recieverId);
    console.log(user);
    io.to(user.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });

  socket.on("disconnect", () => {
    console.log("socket disconnected");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

// errorMiddleware
app.use(errorHandler);
// checking database connected and server running
mongoose.connection.once("open", () => {
  console.log("Database connected".green.underline);
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`.cyan.underline);
  });
});
