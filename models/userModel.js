import mongoose from "mongoose";
import validate from "validator";

const userSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    minlength: [3, "Full name must be at least 3 characters"],
  },
  email: {
    type: String,
    required: true,
    validate: [validate.isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: true,
    minlength: [8, "Password must be at least 8 characters"],
  },
  currentPassword: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    enum: ["USER", "ADMIN"],
    default: "USER",
  },
  phoneNumber: {
    type: String,
    required: true,
  },
});

export default mongoose.model("User", userSchema);
