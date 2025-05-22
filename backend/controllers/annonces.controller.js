const Annonce = require('../models/annonces.model');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.createAnnonce = async (req, res) => {
  console.log("oskour")
  try {

    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token' });


    try {

      var tok = jwt.verify(token, process.env.JWT_SECRET);
      console.log(tok.id)
      const author = tok.id 

      const { title, categorie, description, prix } = req.body;
      const userExists = await User.findById(author);
      if (!userExists) return res.status(404).json({ error: 'Utilisateur introuvable' });

      const annonce = new Annonce({ title, categorie, author, description, prix });
      await annonce.save();
      res.status(201).json(annonce);
    } catch(err) {

      console.log(err)
      res.status(401).json({ message: 'Invalid token' });
    }
    //blbl
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllAnnonces = async (req, res) => {
  try {
    const annonces = await Annonce.find().populate('author', 'username').sort({ date_ajout: -1 });
    res.json(annonces);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAnnonceById = async (req, res) => {
  try {
    const annonce = await Annonce.findById(req.params.id).populate('author', 'username');
    if (!annonce) return res.status(404).json({ error: 'Annonce introuvable' });
    res.json(annonce);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateAnnonce = async (req, res) => {
  try {
    const { title, categorie, description, prix } = req.body;
    const updated = await Annonce.findByIdAndUpdate(
      req.params.id,
      { title, categorie, description, prix },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: 'Annonce non trouvée' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteAnnonce = async (req, res) => {
  try {
    const deleted = await Annonce.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Annonce non trouvée' });
    res.json({ message: 'Annonce supprimée' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
