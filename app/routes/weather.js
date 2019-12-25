const express = require('express');
const router = express.Router();
const axios = require('axios');
const asyncWrapper = require('../utils/asyncWrapper');

router.post('/weather', asyncWrapper(async (req, res) => {
    const result = await axios.default.get(`https://fcc-weather-api.glitch.me/api/current?lat=${req.body.lat}&lon=${req.body.lon}`);
    res.json(result.data);
}));

module.exports = router;
