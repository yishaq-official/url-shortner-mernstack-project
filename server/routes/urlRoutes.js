const express = require('express');
const { handleGenerateNewShortURL, handleGetAnalytics } = require('../controllers/urlController');

const router = express.Router();

// POST /url  -> Generates a new short link
router.post('/', handleGenerateNewShortURL);

// GET /url/analytics/:shortId -> Returns stats
router.get('/analytics/:shortId', handleGetAnalytics);

module.exports = router;