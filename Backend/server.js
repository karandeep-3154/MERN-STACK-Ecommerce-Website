import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./Config/db.js";
import authRoutes from "./Routes/authRoute.js";
import cors from 'cors';

//CONFIGURING ENVIRONMENT
dotenv.config();

//DATABASE CONFIG
connectDB();

//CREATING OBJECT FOR RESTAPI
const app = express();

//MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//Routes
app.use("/api/v1/auth", authRoutes);

// RESTAPI STARTS

app.get("/", (req, res) => {
  res.send("<h1>Hello from server side</h1>");
});

//DECLARING PORT NO. AT WHICH APPLICATION'S SERVER WILL START
const port = process.env.port || 8080;

app.listen(port, () => {
  console.log(
    `Server running in ${process.env.DEV_MODE} Mode Started at port ${port}`
      .bgMagenta.white
  );
});
