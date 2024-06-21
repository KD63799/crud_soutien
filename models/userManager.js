const argon2 = require("argon2");

// Tableau des utilisateurs avec des informations de base et des mots de passe en clair
let users = [
  {
    id: 1,
    username: "alice",
    job: "Ingénieure",
    city: "Paris",
    password: "alice2024!",
  },
  {
    id: 2,
    username: "bob",
    job: "Médecin",
    city: "Lyon",
    password: "bob2024!",
  },
  {
    id: 3,
    username: "charlie",
    job: "Étudiant",
    city: "Marseille",
    password: "charlie2024!",
  },
  {
    id: 4,
    username: "david",
    job: "Architecte",
    city: "Toulouse",
    password: "david2024!",
  },
  {
    id: 5,
    username: "eve",
    job: "Graphiste",
    city: "Nice",
    password: "eve2024!",
  },
  {
    id: 6,
    username: "frank",
    job: "Chef de projet",
    city: "Bordeaux",
    password: "frank2024!",
  },
  {
    id: 7,
    username: "grace",
    job: "Designer",
    city: "Nantes",
    password: "grace2024!",
  },
  {
    id: 8,
    username: "hugo",
    job: "Développeur",
    city: "Strasbourg",
    password: "hugo2024!",
  },
  {
    id: 9,
    username: "isabelle",
    job: "Professeure",
    city: "Lille",
    password: "isabelle2024!",
  },
  {
    id: 10,
    username: "jack",
    job: "Journaliste",
    city: "Rennes",
    password: "jack2024!",
  },
];

// Fonction pour récupérer la liste des utilisateurs
const getUsers = () => users;

// Fonction pour récupérer un utilisateur par son ID
const getUserById = (id) => users.find((user) => user.id === id);

// Fonction asynchrone pour hacher un mot de passe en utilisant argon2
const hashPassword = async (password) => {
  try {
    return await argon2.hash(password);
  } catch (err) {
    console.error("Error hashing password:", err);
    throw err;
  }
};

// Fonction asynchrone pour ajouter un nouvel utilisateur avec mot de passe haché
const addUser = async (newUser) => {
  try {
    newUser.id = users.length ? users[users.length - 1].id + 1 : 1;
    newUser.password = await hashPassword(newUser.password);
    users.push(newUser);
    return newUser;
  } catch (err) {
    console.error("Error adding user:", err);
    throw err;
  }
};

// Fonction pour mettre à jour un utilisateur existant par son ID
const updateUser = (id, updatedUser) => {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    users[index] = { ...users[index], ...updatedUser };
    return users[index];
  }
  return null;
};

// Fonction pour supprimer un utilisateur par son ID
const deleteUser = (id) => {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
  return null;
};

// Fonction pour trouver un utilisateur par son nom d'utilisateur (username)
const findUserByUsername = (username) =>
  users.find((user) => user.username === username);

// Fonction asynchrone pour vérifier le mot de passe d'un utilisateur
const verifyPassword = async (user, password) => {
  try {
    return await argon2.verify(user.password, password);
  } catch (err) {
    console.error("Error verifying password:", err);
    throw err;
  }
};

// Fonction d'initialisation pour hacher les mots de passe en clair
const initializeUsers = async () => {
  try {
    for (let user of users) {
      user.password = await hashPassword(user.password);
    }
    console.log("Users initialized with hashed passwords");
  } catch (err) {
    console.error("Error initializing users:", err);
  }
};

// Exportation des fonctions pour les utiliser dans d'autres parties de l'application
module.exports = {
  getUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
  findUserByUsername,
  verifyPassword,
  initializeUsers,
};
