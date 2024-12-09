const express = require('express');
const router = express.Router();
const { User } = require('../models/user'); 
const Joi = require("joi");
const bcrypt = require("bcrypt");

router.put('/change-password/:email', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        if (user) {
            const salt = await bcrypt.genSalt(Number(6));
		    const hashPassword = await bcrypt.hash(req.body.password, salt);
            user.password=hashPassword;

		//console.log(hashPassword)
		//await new User({ ...req.body, password: hashPassword }).save();
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