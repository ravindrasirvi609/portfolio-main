import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String },
  mobileNo: { type: Number },
  email: { type: String },
  message: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const userData =
  mongoose.models.userModel || mongoose.model("userModel", userSchema);

export default userData;
