const userManager = require("../models/userManager");
const jwt = require("jsonwebtoken");
const argon2 = require("argon2");

// Utilisez une clé secrète pour signer le JWT. En production, stockez-la dans une variable d'environnement.
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

const getAllUsers = (req, res) => {
  res.json(userManager.getUsers());
};

const getUserById = (req, res) => {
  const userId = parseInt(req.params.id);
  const user = userManager.getUserById(userId);
  if (user) {
    res.json(user);
  } else {
    res.status(404).send("Utilisateur non trouvé");
  }
};

const createUser = async (req, res) => {
  const newUser = req.body;
  try {
    // Hacher le mot de passe avant de l'ajouter
    const addedUser = await userManager.addUser(newUser);
    res.status(201).json(addedUser);
  } catch (err) {
    res.status(500).send("Erreur lors de la création de l'utilisateur");
  }
};

const updateUser = (req, res) => {
  const userId = parseInt(req.params.id);
  const updatedUser = req.body;
  const result = userManager.updateUser(userId, updatedUser);
  if (result) {
    res.json(result);
  } else {
    res.status(404).send("Utilisateur non trouvé");
  }
};


const getUserByUserName = (req, res) => {
  const { username } = req.body;
  const user = userManager.findUserByUsername(username);
  if (user) {
    res.json(user);
  } else {
    res.status(401).send("Utilisateur non trouvé");
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  
  // Recherchez l'utilisateur par nom d'utilisateur
  const user = userManager.findUserByUsername(username);
  if (!user) {
    return res.status(401).json({ message: "Nom d'utilisateur ou mot de passe incorrect" });
  }
  
  // Vérifiez le mot de passe
  const isPasswordValid = await userManager.verifyPassword(user, password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Nom d'utilisateur ou mot de passe incorrect" });
  }
  
  // Créez un token JWT
  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
  
  // Retournez le token au client
  res.json({ token });
};
const deleteUser = (req, res) => {
  const userId = parseInt(req.params.id);
  const deletedUser = userManager.deleteUser(userId);
  if (deletedUser) {
    res.json(deletedUser);
  } else {
    res.status(404).send("Utilisateur non trouvé");
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserByUserName,
  login,
};
