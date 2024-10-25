import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    console.log(req.body);
    const { fullName, password, currentPassword, phoneNumber, email } =
      req.body;

    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    if (password !== currentPassword)
      return res.status(400).json({ message: "Password not match" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedCurrentPassword = await bcrypt.hash(currentPassword, 10);
    const hashedPhoneNumber = await bcrypt.hash(phoneNumber, 10);

    const createdUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
      currentPassword: hashedCurrentPassword,
      phoneNumber: hashedPhoneNumber,
    });

    return res
      .status(201)
      .json({ createdUser, message: "User created successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Create user failed" });
  }
});

router.post("/signin", async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User does not exists" });

    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword)
      return res.status(400).json({ message: "Wrong Password" });

    return res
      .status(200)
      .json({ user, message: "Authentication succesfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router;
