import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import userRouter from "./Routers/userRouter.js";
import cors from "cors";

dotenv.config();

mongoose
  .connect("mongodb://127.0.0.1:27017/CozaStoreUser")
  .then(() => console.log("MongoDB'ye bağlanıldı"))
  .catch((err) => console.error("MongoDB bağlantı hatası:", err));

const app = express();
app.use(express.json());
app.use(cors());
app.use("/users", userRouter);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
