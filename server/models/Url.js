const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  shortId: {
    type: String,
    required: true,
    unique: true,
  },
  originalUrl: {
    type: String,
    required: true,
  },
  // REMOVED "createdBy" field
  clicks: {
    type: Number,
    required: true,
    default: 0,
  },
  visitHistory: [
    { 
      timestamp: { type: Number } 
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Url', urlSchema);