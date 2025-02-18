import mongoose from "mongoose";

const siteVisitorSchema = new mongoose.Schema({
  // Automatically Collected Information
  ipAddress: { type: String },
  userAgent: { type: String },
  browser: { type: String },
  operatingSystem: { type: String },
  deviceType: { type: String },
  screenResolution: { type: String },
  referrer: { type: String },
  language: { type: String },
  sessionId: { type: String },

  // Enhanced Device Information
  browserVersion: { type: String },
  deviceBrand: { type: String },
  deviceModel: { type: String },
  colorDepth: { type: Number },
  windowSize: { type: String },
  touchSupport: { type: Boolean },
  cookiesEnabled: { type: Boolean },
  doNotTrack: { type: Boolean },
  networkType: { type: String },
  connectionSpeed: { type: String },
  batteryLevel: { type: Number },
  memoryUsage: { type: Number },

  // Enhanced Location Data
  country: { type: String },
  city: { type: String },
  region: { type: String },
  timezone: { type: String },
  latitude: { type: Number },
  longitude: { type: Number },
  isp: { type: String },

  // User Behavior Analytics
  visitedPages: [
    {
      url: { type: String },
      duration: { type: Number },
      timestamp: { type: Date, default: Date.now },
      scrollDepth: { type: Number },
      interactionCount: { type: Number },
    },
  ],
  actions: [
    {
      type: { type: String },
      target: { type: String },
      timestamp: { type: Date, default: Date.now },
      value: { type: mongoose.Schema.Types.Mixed },
    },
  ],

  // Session Information
  sessionDuration: { type: Number },
  pageViews: { type: Number },
  firstVisit: { type: Boolean },
  returningVisitor: { type: Boolean },
  lastVisitDate: { type: Date },
  exitPage: { type: String },
  bounced: { type: Boolean },

  // Performance Metrics
  pageLoadTime: { type: Number },
  domLoadTime: { type: Number },
  firstContentfulPaint: { type: Number },
  largestContentfulPaint: { type: Number },

  // Marketing Data
  utmSource: { type: String },
  utmMedium: { type: String },
  utmCampaign: { type: String },
  utmTerm: { type: String },
  utmContent: { type: String },

  // User Preferences
  colorScheme: { type: String }, // dark/light mode
  fontSize: { type: String },
  accessibility: {
    reducedMotion: { type: Boolean },
    highContrast: { type: Boolean },
  },

  // User-Provided Information
  name: { type: String },
  email: { type: String },
  phoneNumber: { type: String },
  feedback: { type: String },
  occupation: { type: String },
  interests: [String],
  preferredLanguage: { type: String },

  // Social Integration
  socialProfiles: {
    linkedin: { type: String },
    github: { type: String },
    twitter: { type: String },
  },

  // Consent Management
  privacyConsent: { type: Boolean },
  marketingConsent: { type: Boolean },
  cookieConsent: { type: Boolean },
  consentTimestamp: { type: Date },

  // Metadata
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Enhanced indexing for better query performance
siteVisitorSchema.index({ ipAddress: 1 });
siteVisitorSchema.index({ sessionId: 1 });
siteVisitorSchema.index({ createdAt: 1 });
siteVisitorSchema.index({ "visitedPages.url": 1 });
siteVisitorSchema.index({ email: 1 });

const SiteVisitorModel =
  mongoose.models.SiteVisitor ||
  mongoose.model("SiteVisitor", siteVisitorSchema);

export default SiteVisitorModel;
