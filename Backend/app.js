const express = require("express");
const dotenv = require("dotenv");
const portfolioRouter = require("./routes/portfolio"); // Import routes
const userRouter = require("./routes/user");
const settingsRouter = require("./routes/settings");
const supportRouter = require("./routes/support");
const cors = require('cors');

// Load environment variables
if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: ".env.development" });
} else {
  dotenv.config({ path: ".env.production" });
}

const connectDB = require("./config/db"); // Import database connection function
const app = express();
const PORT = process.env.PORT || 3000;

connectDB(); // Initiate database connection

// Allow all origins
app.use(cors());
app.use(express.json()); // Parses JSON data
app.use(express.urlencoded({ extended: true }));

// Mount the routes
app.use("/recipe", portfolioRouter);
app.use("/user", userRouter);
app.use("/settings", settingsRouter);
app.use("/support", supportRouter);
// Serve static files from the 'uploads' directory
app.use('/uploads', express.static('uploads'));


app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
