const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Le nom du produit est requis.'],
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: [true, 'Le prix du produit est requis.'],
    },
    category: {
        type: String,
        required: [true, 'La catégorie est requise.'],
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Product', productSchema);
