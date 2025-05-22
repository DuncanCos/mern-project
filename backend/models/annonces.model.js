// models/Annonce.js
const { Schema, model } = require('mongoose');

const annonceSchema = new Schema({
  title: { type: String, required: true },
  categorie: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  description: { type: String, required: true },
  prix: { type: Number, required: true },
  date_ajout: { type: Date, default: Date.now }
});

module.exports = model('Annonce', annonceSchema);
