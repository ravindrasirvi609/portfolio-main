import mongoose from "mongoose";

const fields = {
  description: { type: String, required: true, trim: true },
  placeStored: { type: String, required: true, trim: true },
  packages: { type: Number, required: true, min: 0 },
  quantity: { type: Number, required: true, min: 0 },
  rate: { type: Number, required: true, min: 0 },
};

const stockProductSchema = new mongoose.Schema(fields, { timestamps: true });
const existingModel = mongoose.models.StockProduct;

// Next.js keeps models alive during hot reload. Extend a cached pre-change
// model so the new numeric fields are not silently discarded on save.
if (existingModel && !existingModel.schema.path("packages")) {
  existingModel.schema.add(fields);
}

export default existingModel || mongoose.model("StockProduct", stockProductSchema);
