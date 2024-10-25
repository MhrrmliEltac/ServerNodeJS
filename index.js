import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import userRouter from "./Routers/userRouter.js";
import cors from "cors";

dotenv.config();

// MongoDB bağlantısı
mongoose
  .connect(process.env.DB_CONNECTION_STR, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const app = express();
app.use(express.json());
app.use(cors());
app.use("/users", userRouter);

app.listen(5000, () => {
  console.log("Connected");
});
