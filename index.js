import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import userRouter from "./Routers/userRouter.js";
import cors from "cors";

dotenv.config();

mongoose
  .connect(process.env.DB_CONNECTION_STR)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const app = express();
app.use(express.json());
app.use(cors());
app.use("/users", userRouter);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
