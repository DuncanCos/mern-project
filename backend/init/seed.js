 // Créer l'utilisateur MongoDB
db.createUser({
  user: "appuser",
  pwd: "apppass",
  roles: [{ role: "readWrite", db: "mydb" }]
});

// Sélectionner la base mydb
db = db.getSiblingDB('mydb');

// Insérer des utilisateurs avec username, mail, et mot de passe hashé (ex: "1234")
db.users.insertMany([
  {
    _id: ObjectId("664db1d229e4a02f491b7e4b"),
    username: "alice",
    mail: "alice@example.com",
    password: "$2b$10$Wn7x7ihLdATqqZEuTvlTmuPKHE9F4QWpIYOj2RfHnyOIVfUOfzEhu" // "1234"
  },
  {
    _id: ObjectId("664db1d229e4a02f491b7e4c"),
    username: "bob",
    mail: "bob@example.com",
    password: "$2b$10$Wn7x7ihLdATqqZEuTvlTmuPKHE9F4QWpIYOj2RfHnyOIVfUOfzEhu" // "1234"
  }
]);

// Insérer des annonces liées aux utilisateurs
db.annonces.insertMany([
  {
    title: "Vélo route carbone",
    categorie: "Sport",
    author: ObjectId("664db1d229e4a02f491b7e4b"),
    description: "Excellent état, très léger",
    prix: 850,
    date_ajout: new Date()
  },
  {
    title: "Canapé 3 places",
    categorie: "Maison",
    author: ObjectId("664db1d229e4a02f491b7e4c"),
    description: "Très confortable, tissu gris",
    prix: 300,
    date_ajout: new Date()
  }
]);

print("✔️ Base mydb initialisée avec appuser, 2 utilisateurs avec mail, et 2 annonces.");

  