const express = require('express');
const auth = require('../middleware/auth'); // Middleware d'authentification
const Portfolio = require('../models/Portfolio');

const router = express.Router();

// Ajouter un actif
router.post('/add', auth, async (req, res) => {
    const { asset, quantity, value } = req.body;

    try {
        const newAsset = new Portfolio({
            userId: req.user.id,
            asset,
            quantity,
            value
        });

        const asset = await newAsset.save();
        res.json(asset);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Récupérer le portefeuille d'un utilisateur
router.get('/', auth, async (req, res) => {
    try {
        const portfolio = await Portfolio.find({ userId: req.user.id });
        res.json(portfolio);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
