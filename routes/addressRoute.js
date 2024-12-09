const express = require('express');
const router = express.Router();
const { User } = require('../models/user'); 
const Joi = require("joi");

router.put('/change-address/:email', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        if (user) {
            user.address=req.body.address,
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