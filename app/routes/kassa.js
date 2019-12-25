const express = require('express');
const router = express.Router();
const User = require('../database/dao/user');
const asyncWrapper = require('../utils/asyncWrapper');

router.get('/money', asyncWrapper(async (req, res) => {
    const balance = await User.getBalance(req.user.id);
    res.json({ balance });
}));

router.put('/money',  asyncWrapper(async (req, res) => {
    let balance;
    if (req.body.type === 'increase') {
        balance = await User.increaseBalance(req.user.id, req.body.amount);
    } else {
        balance = await User.decreaseBalance(req.user.id, req.body.amount);
    }
    res.json({ balance });
}));

module.exports = router;