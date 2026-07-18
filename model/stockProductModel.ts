import mongoose from "mongoose";

const stockProductSchema = new mongoose.Schema(
  {
    description: { type: String, required: true, trim: true },
    placeStored: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

export default mongoose.models.StockProduct ||
  mongoose.model("StockProduct", stockProductSchema);
