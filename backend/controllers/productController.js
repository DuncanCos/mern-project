const Product = require('../models/Product');

exports.createProduct = async (req, res) => {
    try {
        const { name, description, price, category } = req.body;

        const product = new Product({
            name,
            description,
            price,
            category,
            owner: req.user.id, 
        });

        await product.save();
        res.status(201).json(product);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
  

// Récupérer tous les produits
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('owner');
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Récupérer un seul produit
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('owner');
        if (!product) return res.status(404).json({ error: 'Produit introuvable.' });
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Mettre à jour un produit
exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!product) return res.status(404).json({ error: 'Produit introuvable.' });
        res.status(200).json(product);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Supprimer un produit
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ error: 'Produit introuvable.' });
        res.status(200).json({ message: 'Produit supprimé.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
