// import path from "path";
// import express from "express";
const express = require("express");
const env = require("dotenv");
// import cors from "cors";
const cors = require("cors");
const userRoutes = require("./routes/userRoutes.js");
const productRoutes = require("./routes/productRoutes.js");
// import connectDB from "./config/db.js";
// import colors from "colors";
// import morgan from "morgan";
// import { notFound, errorHandler } from "./middleware/errorMiddleware.js";    

// import productRoutes from "./routes/productRoutes.js";
// import userRoutes from "./routes/userRoutes";
// import orderRoutes from "./routes/orderRoutes.js";
// import uploadRoutes from "./routes/uploadRoutes.js";
// import ProductData from "./DefaultData/ProductData.js"
// import UserData from "./DefaultData/UserData.js"




const app = express();

// if (process.env.NODE_ENV === "development") {
//   app.use(morgan("dev"));
// }
// app.use(express.static("images"));
env.config({path:"./config.env"})

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
// app.use(require("./config/db"))
require("./config/db")
require("./models/userModel")






app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
// app.use("/api/orders", orderRoutes);
// app.use("/api/upload", uploadRoutes);

// app.get("/api/config/paypal", (req, res) =>
//   res.send(process.env.PAYPAL_CLIENT_ID)
// );




// const __dirname = path.resolve();

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "/ecom-frontend/build")));

//   app.get("*", (req, res) =>
//     res.sendFile(
//       path.resolve(__dirname, "ecom-frontend", "build", "index.html")
//     )
//   );
// } else {
  app.get("/", (req, res) => {
    res.send(" API is Running...");
  });
// }

// app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// app.use(notFound);

// app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(
  PORT,
  console.log(
    `server running in ${process.env.NODE_ENV} on port ${PORT}`
  )
);


// ProductData();
// UserData();