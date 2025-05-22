const express = require('express');
const router = express.Router();
const annonceController = require('../controllers/annonces.controller');

router.post('/', annonceController.createAnnonce);
router.get('/', annonceController.getAllAnnonces);
router.get('/:id', annonceController.getAnnonceById);
router.put('/:id', annonceController.updateAnnonce);
router.delete('/:id', annonceController.deleteAnnonce);

module.exports = router;
