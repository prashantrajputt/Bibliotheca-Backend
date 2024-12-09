const express = require('express');
const router = express.Router();
const { User } = require('../models/user'); 
const Joi = require("joi");
const bcrypt = require("bcrypt");

router.put('/buy-product/:email/:id/:q', async (req, res) => {
    try {
        const user= await User.findOne({ email: req.params.email });
        if (user) 
        {
            user.Buy.push(req.params.id);
            user.buyQuantity.push(req.params.q);
            await user.save();
            return res.json(user); 
        } else {
            return res.status(404).send('User not found'); 
        }
    } catch (err) {
        return res.status(500).send('Server error'); 
    }
});

module.exports = router;