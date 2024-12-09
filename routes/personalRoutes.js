const express = require('express');
const router = express.Router();
const { User } = require('../models/user'); 
const Joi = require("joi");

router.put('/personal-details/:email', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        if (user) {
            user.Name=req.body.Name,
            user.address=req.body.address,
            user.creditCard=req.body.creditCard,
            user.bank=req.body.bank,
            user.gender=req.body.gender,
            user.mob=req.body.mob,
            user.pincode=req.body.pincode,
            user.cvv=req.body.cvv,
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