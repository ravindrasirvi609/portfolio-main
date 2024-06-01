import mongoose from "mongoose";

const visitorSchema = new mongoose.Schema({
  latitude: { type: Number },
  longitude: { type: Number },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const VisitorModel =
  mongoose.models.Visitor || mongoose.model("Visitor", visitorSchema);

export default VisitorModel;
