import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import userRouter from "./Routers/userRouter.js";
import cors from "cors";

dotenv.config();

const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
};

mongoose
  .connect(process.env.DB_CONNECTION_STR, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const app = express();
app.use(express.json());
app.use(cors(corsOptions));

app.options("*", cors(corsOptions));

app.use("/users", userRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
