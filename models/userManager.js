// Importation du module argon2 pour le hachage des mots de passe
const argon2 = require('argon2');

// Tableau des utilisateurs avec des informations de base et des mots de passe en clair (à hacher)
let users = [
  { id: 1, username: "alice", job: "Ingénieure", city: "Paris", password: "alice2024!" },
  { id: 2, username: "bob", job: "Médecin", city: "Lyon", password: "bob2024!" },
  { id: 3, username: "charlie", job: "Étudiant", city: "Marseille", password: "charlie2024!" },
  { id: 4, username: "david", job: "Architecte", city: "Toulouse", password: "david2024!" },
  { id: 5, username: "eve", job: "Graphiste", city: "Nice", password: "eve2024!" },
  { id: 6, username: "frank", job: "Chef de projet", city: "Bordeaux", password: "frank2024!" },
  { id: 7, username: "grace", job: "Designer", city: "Nantes", password: "grace2024!" },
  { id: 8, username: "hugo", job: "Développeur", city: "Strasbourg", password: "hugo2024!" },
  { id: 9, username: "isabelle", job: "Professeure", city: "Lille", password: "isabelle2024!" },
  { id: 10, username: "jack", job: "Journaliste", city: "Rennes", password: "jack2024!" }
];

// Fonction pour récupérer la liste des utilisateurs
const getUsers = () => users;

// Fonction pour récupérer un utilisateur par son ID
const getUserById = (id) => users.find(user => user.id === id);

// Fonction asynchrone pour hacher un mot de passe en utilisant argon2
const hashPassword = async (password) => {
  try {
    // Hachage du mot de passe et retour du mot de passe haché
    return await argon2.hash(password);
  } catch (err) {
    // Affichage d'une erreur en cas de problème lors du hachage
    console.error('Error hashing password:', err);
    throw err; // Propagation de l'erreur
  }
};

// Fonction asynchrone pour ajouter un nouvel utilisateur avec mot de passe haché
const addUser = async (newUser) => {
  try {
    // Hachage du mot de passe avant d'ajouter l'utilisateur
    newUser.password = await hashPassword(newUser.password);
    // Ajout de l'utilisateur au tableau des utilisateurs
    users.push(newUser);
    // Retour du nouvel utilisateur ajouté
    return newUser;
  } catch (err) {
    // Affichage d'une erreur en cas de problème lors de l'ajout
    console.error('Error adding user:', err);
    throw err; // Propagation de l'erreur
  }
};

// Fonction pour mettre à jour un utilisateur existant par son ID
const updateUser = (id, updatedUser) => {
  // Recherche de l'index de l'utilisateur à mettre à jour
  const index = users.findIndex(user => user.id === id);
  if (index !== -1) {
    // Mise à jour des informations de l'utilisateur
    users[index] = { ...users[index], ...updatedUser };
    // Retour de l'utilisateur mis à jour
    return users[index];
  }
  // Retour null si l'utilisateur n'a pas été trouvé
  return null;
};

// Fonction pour supprimer un utilisateur par son ID
const deleteUser = (id) => {
  // Recherche de l'index de l'utilisateur à supprimer
  const index = users.findIndex(user => user.id === id);
  if (index !== -1) {
    // Suppression de l'utilisateur du tableau et retour de l'utilisateur supprimé
    return users.splice(index, 1)[0];
  }
  // Retour null si l'utilisateur n'a pas été trouvé
  return null;
};

// Fonction pour trouver un utilisateur par son nom d'utilisateur (username)
const findUserByUsername = (username) => {
  // Recherche de l'utilisateur avec le nom d'utilisateur correspondant
  return users.find(user => user.username === username);
};

// Exportation des fonctions pour les utiliser dans d'autres parties de l'application
module.exports = {
  getUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
  findUserByUsername
};