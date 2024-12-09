const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

// Define the user schema
const productSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    sellerName: { type: String, required: true },
    Name: { type: String, required: true },
    author: { type: String, required: true },
    caption: { type: String, required: true },
    Img: { type: String, required: true },
    Price: { type: Number, required: true },
    initialAvl: { type: Number, required: true },
    currAvl: { type: Number, required: true },
});

productSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, 'defaultsecret', {
        expiresIn: "7d",
    });
    return token;
};

const Product = mongoose.model("Product", productSchema);

const validate = (data) => {
    const schema = Joi.object({
        id: Joi.number().integer().required().label("Book Id"),
        sellerName: Joi.string().required().label("Seller Name"),
        Name: Joi.string().required().label("Name"),
        author: Joi.string().required().label("Author Name"),
        caption: Joi.string().required().label("Caption"),
        Img: Joi.string().required().label("Img Link"),
        Price: Joi.number().integer().required().label("Price"),
        initialAvl: Joi.number().integer().required().label("Initial Availability"),
        currAvl: Joi.number().integer().required().label("Current Availability")
    });
    return schema.validate(data);
};

module.exports = { Product, validate };
