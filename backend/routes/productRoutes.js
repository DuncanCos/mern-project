const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const auth = require('../middlewares/auth.middleware');

// CRUD routes sécurisées
router.post('/', auth, productController.createProduct);
router.get('/', auth, productController.getAllProducts);
router.get('/:id', auth, productController.getProductById);
router.put('/:id', auth, productController.updateProduct);
router.delete('/:id', auth, productController.deleteProduct);
router.get('/user/me', auth, productController.getMyProducts);
router.get('/user/:userId', auth, productController.getProductsByUserId);

module.exports = router; 