const express = require("express");
const bodyParser = require("body-parser");

const userControllers = require("./controllers/userControllers");
const { initializeUsers } = require("./models/userManager");

// Création d'une instance de l'application Express
const app = express();

// Utilisation du middleware 'body-parser' pour analyser les données JSON dans le corps des requêtes HTTP
app.use(bodyParser.json());

// Définition d'une route de test
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Routes pour les utilisateurs
app.get("/users", userControllers.getAllUsers);
app.get("/users/:id", userControllers.getUserById);
app.post("/users", userControllers.createUser);
app.put("/users/:id", userControllers.updateUser);
app.delete("/users/:id", userControllers.deleteUser);
app.post("/users/login", userControllers.login);

// Fonction pour démarrer le serveur après l'initialisation des utilisateurs
const startServer = async () => {
  await initializeUsers();
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
  });
};

// Démarrage du serveur
startServer();
