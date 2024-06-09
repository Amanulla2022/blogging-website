const express = require("express");
const connectDB = require("./config/db"); // db connection function
const authRoutes = require("./routes/auth"); // auth routes
const postRoutes = require("./routes/post"); //post routes
const commentRoutes = require("./routes/comment"); //comment routes

// initialize express app
const app = express();
const port = 8000;

// Middleware to parse JSON requests
app.use(express.json());

// Connect to the database
connectDB();

// Routes
app.use("/auth", authRoutes); // Mount authentication routes under /auth URL prefix
app.use("/posts", postRoutes); // Mount post routes under /posts URL prefix
app.use("/comments", commentRoutes); // Mount comment routes under /comments URL prefix

// Start the server on port 8000
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
