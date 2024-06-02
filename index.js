const express = require("express");
const connectDB = require("./config/db.config");
const http = require("http");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const cors = require("cors");
const app = express();
const PORT_DEFAULT = 8000;
connectDB();
// Init middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use(helmet());

/**
 * Normalize a port into a number, string, or false.
 * @param {any} val - Port value
 * @returns {number|string|boolean} - Normalized port
 */
const normalizePort = (val) => {
  const port = parseInt(val, 10);
  if (isNaN(port)) return val;
  if (port >= 0) return port;
  return false;
};

const PORT = normalizePort(process.env.PORT || PORT_DEFAULT);
/**
 * Server listening on specified port.
 * @name ServerListening
 * @function
 * @memberof module:RandomIdeasAPI
 * @inner
 * @param {number|string} port - Port number
 */

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
