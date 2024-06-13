// controllers/userControllers.js

const userManager = require('../models/userManager');

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

const createUser = (req, res) => {
  const newUser = req.body;
  const addedUser = userManager.addUser(newUser);
  res.status(201).json(addedUser);
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

const deleteUser = (req, res) => {
  const userId = parseInt(req.params.id);
  const deletedUser = userManager.deleteUser(userId);
  if (deletedUser) {
    res.json(deletedUser);
  } else {
    res.status(404).send("Utilisateur non trouvé");
  }
};


const getUserByUserName= (req, res, next) => {
  const { username } = req.body;
  models.user
    .findUserByEmail(username)
    .then(([users]) => {
      if (users[0] != null) {
        const [firstUser] = users;
        req.user = firstUser;
        next();
      } else {
        res.sendStatus(401);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
}; 

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserByUserName
};
