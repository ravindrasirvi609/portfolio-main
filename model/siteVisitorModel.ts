import mongoose from "mongoose";

const siteVisitorSchema = new mongoose.Schema({
  // Automatically Collected Information
  ipAddress: { type: String, required: true }, // IP address of the visitor
  userAgent: { type: String }, // Browser user agent string
  browser: { type: String }, // Browser name/version
  operatingSystem: { type: String }, // OS name/version
  deviceType: { type: String }, // e.g., desktop, mobile, tablet
  screenResolution: { type: String }, // Screen resolution (e.g., 1920x1080)
  referrer: { type: String }, // Referring URL
  language: { type: String }, // Language/locale settings
  sessionId: { type: String, required: true }, // Unique session ID

  country: { type: String }, // Derived from IP or geolocation
  city: { type: String }, // Derived from IP or geolocation
  region: { type: String }, // Derived from IP or geolocation

  // Behavioral Data
  visitedPages: [
    {
      url: { type: String }, // URL of the page visited
      duration: { type: Number }, // Time spent on the page (in seconds)
      timestamp: { type: Date, default: Date.now }, // Time of visit
    },
  ],
  actions: [
    {
      type: { type: String }, // Action type (e.g., "click", "scroll")
      target: { type: String }, // Target element (e.g., button ID)
      timestamp: { type: Date, default: Date.now }, // Time of action
    },
  ],

  // User-Provided Information
  name: { type: String }, // If collected via forms
  email: { type: String }, // If collected via forms
  phoneNumber: { type: String }, // If collected via forms
  feedback: { type: String }, // Feedback or comments

  // Metadata
  createdAt: { type: Date, default: Date.now }, // Record creation timestamp
  updatedAt: { type: Date, default: Date.now }, // Record update timestamp
});

// Indexing for better query performance on specific fields
siteVisitorSchema.index({ ipAddress: 1 });
siteVisitorSchema.index({ sessionId: 1 });

const SiteVisitorModel =
  mongoose.models.Visitor || mongoose.model("SiteVisitor", siteVisitorSchema);

export default SiteVisitorModel;
