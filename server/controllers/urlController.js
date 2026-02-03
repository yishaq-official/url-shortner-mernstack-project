const { nanoid } = require('nanoid');
const Url = require('../models/Url');

// ... (imports remain the same)

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  
  if (!body.url) return res.status(400).json({ error: "url is required" });

  // --- NEW FIX: Force absolute URL ---
  let originalUrl = body.url;
  if (!originalUrl.startsWith('http://') && !originalUrl.startsWith('https://')) {
    originalUrl = 'https://' + originalUrl;
  }
  // -----------------------------------

  const shortID = nanoid(8); 
  console.log("1. Generated ID:", shortID);

  try {
    await Url.create({
      shortId: shortID,
      originalUrl: originalUrl, // <--- Save the fixed URL
      visitHistory: [],
    });
    
    console.log("2. Successfully Saved to DB:", originalUrl);
    
    return res.json({ id: shortID });

  } catch (error) {
    console.error("❌ Database Save Error:", error.message);
    return res.status(500).json({ error: "Database failed to save" });
  }
}

// ... (handleGetAnalytics remains the same)
async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  console.log("Analytics requested for:", shortId); // <--- DEBUG LOG

  const result = await Url.findOne({ shortId });
  
  if (!result) {
    console.log("❌ URL not found in DB");
    return res.status(404).json({ error: "Short URL not found" });
  }

  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = {
  handleGenerateNewShortURL,
  handleGetAnalytics,
};