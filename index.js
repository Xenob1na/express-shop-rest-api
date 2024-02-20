import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import authRouter from "./routes/auth.router.js";
import userRouter from "./routes/user.router.js";
import productsRputer from "./routes/product.router.js";
import orderRouter from "./routes/order.router.js";
import cartRouter from "./routes/cart.router.js";


import "dotenv/config";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/products", productsRputer);
app.use("/api/v1/order", orderRouter);
app.use("/api/v1/cart", cartRouter);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello world" });
});


app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on localhost:${3000}`);
});
