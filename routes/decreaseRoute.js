const express = require('express');
const router = express.Router();
const { Product } = require('../models/product'); 
const Joi = require("joi");
const bcrypt = require("bcrypt");

router.put('/increase-amount/:id', async (req, res) => {
    try {
        const product = await Product.findOne({ id: req.params.id });
        if (product) {
            product.initialAvl--;
            await product.save();
            return res.json(product); 
        } else {
            return res.status(404).send('User not found'); 
        }
    } catch (err) {
        return res.status(500).send('Server error'); 
    }
});

module.exports = router;