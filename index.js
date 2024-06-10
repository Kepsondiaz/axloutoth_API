const express = require("express");
const connectDB = require("./config/db.config");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const cors = require("cors");
const routes = require("./routes/indexRoutes");

const PORT_DEFAULT = 8000;

// Connect to the database
connectDB();

// Initialize Express app
const app = express();

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use(helmet());

// Prefix all API routes with /api/v1
app.use("/api/v1", routes);

// Function to normalize a port into a number, string, or false.
const normalizePort = (val) => {
  const port = parseInt(val, 10);
  if (isNaN(port)) return val;
  if (port >= 0) return port;
  return false;
};

const PORT = normalizePort(process.env.PORT || PORT_DEFAULT);

// Start the server and listen on the specified port
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
