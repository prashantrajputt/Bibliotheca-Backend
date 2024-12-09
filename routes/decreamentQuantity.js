const express = require('express');
const router = express.Router();
const { User } = require('../models/user'); 
const Joi = require("joi");
const bcrypt = require("bcrypt");

router.put('/dec-quantity/:email/:id', async (req, res) => {
    try {
        const user= await User.findOne({ email: req.params.email });
        if (user) {
            const i=user.Basket.indexOf(req.params.id);
            if (i!==-1){
                user.purchaseQuantity[i]--;
                await user.save();
            }
            return res.json(user); 
        } else {
            return res.status(404).send('User not found'); 
        }
    } catch (err) {
        return res.status(500).send('Server error'); 
    }
});

module.exports = router;