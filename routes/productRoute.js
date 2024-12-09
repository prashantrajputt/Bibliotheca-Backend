const router = require("express").Router();
const { Product, validate } = require("../models/product"); 
const bcrypt = require("bcrypt");

router.post("/add-products", async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).send({ message: error.details[0].message });

        const user = new Product({ ...req.body });
        await user.save();

        res.status(201).send({ message: "Product created successfully" });
    } catch (error) {
        console.error("Error in add-products route:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

module.exports = router;