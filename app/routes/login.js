const express = require('express');
const router = express.Router();
const User = require('../database/dao/user');
const asyncWrapper = require('../utils/asyncWrapper');

router.post('/signup', asyncWrapper(async (req, res) => {
    const isUsed = await User.isLoginUsed(req.body.login);

    if (isUsed) {
        throw new Error('login is used');
    }

    const user = await User.createUser(req.body.login, req.body.password, req.body.card, req.body.pincode);
    const token = User.generateUserToken(user);
    res.json(token);
}));

router.post('/login', asyncWrapper(async (req, res) => {
    const user = await User.getUserByCredentials(req.body.login, req.body.password);
    const token = User.generateUserToken(user);
    res.json(token);
}));

module.exports = router;