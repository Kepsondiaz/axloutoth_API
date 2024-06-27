const express = require("express");
const connectDB = require("./config/db.config");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger/swagger_output.json");
const http = require("http");
const socketio = require("socket.io");
require("dotenv").config();

const PORT_DEFAULT = 8000;

// Connexion à la base de données
connectDB();

// Initialisation de l'application Express
const app = express();

// Création du serveur HTTP
const server = http.createServer(app);

// Configuration de socket.io
const io = socketio(server);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use(helmet());

// Servir Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/* Importation et utilisation du gestionnaire de sockets
const socketHandler = require("./sockets/socketHandler")(io);
*/

// Importation et utilisation des routes API
const routes = require("./routes/indexRoutes");
app.use("/api/v1", routes(io));

// Fonction pour normaliser un port en un nombre, chaîne de caractères ou false.
const normalizePort = (val) => {
  const port = parseInt(val, 10);
  if (isNaN(port)) return val;
  if (port >= 0) return port;
  return false;
};

const PORT = normalizePort(process.env.PORT || PORT_DEFAULT);

// Démarrage du serveur et écoute sur le port spécifié
server.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});