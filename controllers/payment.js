const {  createrazorpayInstance } = require("../config/razorpay");
const crypto=require("crypto");
require("dotenv").config();


const razorpayInstance=createrazorpayInstance();


exports.createOrder=async(req,res)=>{
    const {id,Price}=req.body;
    console.log(Price)
    if(!id || !Price)
    {
        return res.status(400).json({
            
            success:false,
            message:"id and price is required."
        })
    }

    const options={
        amount:Price*100,
        currency:"INR",
        receipt:`receipt_order_1`
    };

    try{
        razorpayInstance.orders.create(options,(err,order)=>{
            if(err)
            {
                return res.status(500).json({
                    success:false,
                    message:"Something went1 wrong",
                })
            }
            return res.status(200).json(order)
        });
    }catch(error)
    {
        return res.status(500).json({
            success: false,
            message:"Something went wrong",
        });
    }
}


exports.verifyPayment=async(req,res)=>{
    const {order_id,payment_id,signature}=req.body;

    const secret=process.env.RAZORPAY_KEY_SECRET;

    const hmac=crypto.createHmac("sha256",secret);
    hmac.update(order_id+"|"+payment_id);
    const generatedSignature=hmac.digest("hex");

    if(generatedSignature===signature)
    {
        return res.status(200).json({
            success:true,
            message:"Payment verified",
        });
    }else
    {
        return res.status(400).json({
            success:false,
            message:"Payment not verified",
        })
    }
}