import mongoose from "mongoose";

const promptSchema = new mongoose.Schema({
  prompt: { type: String },
  output: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Prompt =
  mongoose.models.promptModel || mongoose.model("promptModel", promptSchema);

export default Prompt;
