const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");

const productRoute=require("./routes/productRoute");
const userRoute=require("./routes/userRoute");
const allRoute=require("./routes/allRoutes");
const loginRoute=require("./routes/loginRoute");
const detailRoute=require("./routes/detailsRoute");
const personalRoute=require("./routes/personalRoutes");
const passwordRoute=require("./routes/passwordroutes");
const increaseRoute=require("./routes/increaseRoute");
const decreaseRoute=require("./routes/decreaseRoute");
const addRoute=require("./routes/addProduct");
const quantityRoute=require("./routes/updateQuantity");
const decRoute=require("./routes/decreamentQuantity");
const removeProductRoute=require("./routes/removeProduct");
const increaseProductQuantity=require("./routes/increaseProductQuantity");
const addressRoute=require("./routes/addressRoute");
const buyRoute=require("./routes/buyProduct");
const router = require("./routes/paymentRoute");

connection()
app.use(express.json());
app.use(cors());
app.use("/api",router)
app.use("/api", productRoute);
app.use("/api", userRoute);
app.use("/api", allRoute);
app.use("/api", loginRoute);
app.use("/api", detailRoute);
app.use("/api", personalRoute);
app.use("/api", passwordRoute);
app.use("/api",increaseRoute);
app.use("/api",decreaseRoute);
app.use("/api",addRoute);
app.use("/api",quantityRoute);
app.use("/api",decRoute);
app.use("/api",removeProductRoute);
app.use("/api",increaseProductQuantity);
app.use("/api",addressRoute);
app.use("/api",buyRoute);

const port =  8080;
app.listen(port, console.log(`Listening on port ${port}...`));