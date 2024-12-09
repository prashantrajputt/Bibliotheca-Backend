const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
    Name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    address:{type:String,default:"Not Uploaded"},
    creditCard:{type:String,default:"Not Uploaded"},
    bank:{type:String,default:"Not Uploaded"},
    gender:{type:String,default:"Not Uploaded"},
    mob:{type:String,default:"Not Uploaded"},
    pincode:{type:String,default:"Not Uploaded"},
    cvv:{type:String,default:"Not Uploaded"},
    Basket: { type: [String] },
    purchaseQuantity:{type :[Number]},
    Buy: { type: [String] },
    buyQuantity:{type :[Number]},
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, 'mysecretkey', {
        expiresIn: "7d",
    });
    return token;
};

const User = mongoose.model("user", userSchema);

const validate = (data) => {
    const schema = Joi.object({
        Name: Joi.string().required().label("Name"),
        email: Joi.string().email().required().label("Email"),
        password: passwordComplexity().required().label("Password"),
        address: Joi.string().default("Not Uploaded.").label("Address"),
        creditCard: Joi.string().default("Not Uploaded.").label("Credit Card"),
        bank: Joi.string().default("Not Uploaded.").label("Bank Name"),
        gender: Joi.string().default("Not Uploaded.").label("Gender"),
        mob: Joi.string().default("Not Uploaded.").label("Mobile Number"),
        pincode: Joi.string().default("Not Uploaded.").label("Pincode"),
        cvv: Joi.string().default("Not Uploaded.").label("CVV"),
        Basket: Joi.array().items(Joi.string()),
        purchaseQuantity: Joi.array().items(Joi.number()),
        Buy: Joi.array().items(Joi.string()),
        buyQuantity: Joi.array().items(Joi.number()),

    });
    return schema.validate(data);
};


module.exports = { User, validate };