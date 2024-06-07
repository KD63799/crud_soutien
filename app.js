// Importation des moduels Express et Body Parser

const express = require('express');
const bodyParser = require('body-parser')

// Creation d'une instance de l'application Express

const app = express();

// Utilisation du middleware 'body-parser' pour analyser les données JSON dans le corps des requêtes HTTP
app.use(bodyParser.json());

// Définition d'une route de test

app.get('/',(req, res) => {
    res.send('Hello World')
});

// Configuration du serveur pour écouter sur le port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});

// création du tableau d'objet

const users = [
    {
      id: 1,
      nom: "Alice",
      age: 28,
      ville: "Paris",
      profession: "Ingénieure"
    },
    {
      id: 2,
      nom: "Bob",
      age: 34,
      ville: "Lyon",
      profession: "Médecin"
    },
    {
      id: 3,
      nom: "Charlie",
      age: 22,
      ville: "Marseille",
      profession: "Étudiant"
    },
    {
      id: 4,
      nom: "David",
      age: 45,
      ville: "Toulouse",
      profession: "Architecte"
    },
    {
      id: 5,
      nom: "Eve",
      age: 30,
      ville: "Nice",
      profession: "Graphiste"
    },
    {
      id: 6,
      nom: "Frank",
      age: 50,
      ville: "Bordeaux",
      profession: "Chef de projet"
    },
    {
      id: 7,
      nom: "Grace",
      age: 27,
      ville: "Nantes",
      profession: "Designer"
    },
    {
      id: 8,
      nom: "Hugo",
      age: 40,
      ville: "Strasbourg",
      profession: "Développeur"
    },
    {
      id: 9,
      nom: "Isabelle",
      age: 35,
      ville: "Lille",
      profession: "Professeure"
    },
    {
      id: 10,
      nom: "Jack",
      age: 29,
      ville: "Rennes",
      profession: "Journaliste"
    }
  ];
  
  
  // Route pour afficher le tableau d'objets
app.get('/users', (req, res) => {
    res.json(users); // Envoie le tableau d'objets sous forme JSON
});

// Route pour ajouter un nouvel item
app.post('/users', (req, res) => {
    const newItem = req.body; // Le nouvel item est contenu dans le corps de la requête
    users.push(newItem); // Ajoute le nouvel item au tableau d'objets
    console.log(newItem);
    res.status(201).json(newItem); // Renvoie le nouvel item ajouté en tant que réponse
});

// Route pour mettre à jour un item existant
app.put('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id); // Récupère l'identifiant de l'utilisateur à mettre à jour depuis les paramètres de l'URL
    const updatedUser = req.body; // Les nouvelles données de l'utilisateur à mettre à jour
    
    // Recherche l'index de l'utilisateur dans le tableau d'objets
    const index = users.findIndex(user => user.id === userId);
    
    if (index !== -1) {
        // Met à jour les données de l'utilisateur
        users[index] = { ...users[index], ...updatedUser };
        res.json(users[index]); // Renvoie les nouvelles données de l'utilisateur
    } else {
        res.status(404).send("Utilisateur non trouvé");
    }
});

// Route pour supprimer un item existant
app.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id); // Récupère l'identifiant de l'utilisateur à supprimer depuis les paramètres de l'URL
    
    // Recherche l'index de l'utilisateur dans le tableau d'objets
    const index = users.findIndex(user => user.id === userId);
    
    if (index !== -1) {
        // Supprime l'utilisateur du tableau d'objets
        const deletedUser = users.splice(index, 1);
        res.json(deletedUser); // Renvoie les données de l'utilisateur supprimé
    } else {
        res.status(404).send("Utilisateur non trouvé");
    }
});


// Route pour afficher un item par son ID
app.get('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id); // Récupère l'identifiant de l'utilisateur depuis les paramètres de l'URL
    
    // Recherche l'utilisateur dans le tableau d'objets
    const user = users.find(user => user.id === userId);
    
    if (user) {
        res.json(user); // Renvoie les données de l'utilisateur trouvé
    } else {
        res.status(404).send("Utilisateur non trouvé");
    }
});
