require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Url = require('./models/Url'); // Import the Model
const urlRoute = require('./routes/urlRoutes'); // Import the Routes

const app = express();

app.use(express.json());
app.use(cors());

// --- DATABASE CONNECTION ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// --- ROUTES ---

// 1. API Routes (For creating links and getting stats)
// This prefixes all routes in that file with "/url"
app.use('/url', urlRoute);

// 2. The Redirect Route (The Core Feature)
// This listens for requests like "localhost:5000/ad72b"
app.get('/:shortId', async (req, res) => {
  const shortId = req.params.shortId;
  console.log("➡️ Redirect requested for ID:", shortId); // <--- DEBUG LOG
  
  try {
    const entry = await Url.findOneAndUpdate(
      { shortId },
      { 
        $push: { 
          visitHistory: { timestamp: Date.now() } 
        } 
      }
    );

    console.log("🔍 Database Search Result:", entry); // <--- DEBUG LOG (Will be 'null' if not found)

    if (entry) {
      res.redirect(entry.originalUrl);
    } else {
      res.status(404).send("Link not found");
    }
  } catch (error) {
    console.error("Redirect Error:", error);
    res.status(500).send("Server Error");
  }
});

// --- START SERVER ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});