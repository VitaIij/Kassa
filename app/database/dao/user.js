const redisClient = require('../connection/redis');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../../../config');

async function isLoginUsed(login) {
    const usersRaw = await redisClient.hvalsAsync('users');
 
    if (!usersRaw.length) {
        return false
    }
    const users = usersRaw.map(user => JSON.parse(user));
    return users.find((user) => user.login === login);
}

function generateUserToken(user) {
    const token = jwt.sign(user, config.jwtSecret);
    return token;
}

async function getUserByCredentials(login, password) {
    const usersRaw = await redisClient.hvalsAsync('users');
    const users = usersRaw.map(user => JSON.parse(user));
    let user = users.find((user) => (user.login === login) && (user.password === password));

    if (!user) {
        throw new Error('Cannot login');
    }

    delete user.password;
    delete user.card;
    return user;
}

async function createUser(login, password, card, pincode) {
    const id = await redisClient.incrAsync('userId');
    let user = new User(id, login, password, card, pincode);
    await redisClient.hsetAsync('users', 'user:' + id, JSON.stringify(user));
    delete user.password;
    delete user.card;

    return Object.assign({}, user);
}

async function deleteUser(userId) {
    const result = await redisClient.hdelAsync('users', 'user:' + userId);
    return result;
}

async function getBalance(userId) {
    const userRaw = await redisClient.hgetAsync('users', 'user:' + userId);
    const user = JSON.parse(userRaw);
    return user.card.balance;
}

async function increaseBalance(userId, amount) {
    const userRaw = await redisClient.hgetAsync('users', 'user:' + userId);
    const user = JSON.parse(userRaw);
    user.card.balance += amount;
    await redisClient.hsetAsync('users', 'user:' + userId, JSON.stringify(user));
    return user.card.balance;
}

async function decreaseBalance(userId, amount) {
    const userRaw = await redisClient.hgetAsync('users', 'user:' + userId);
    const user = JSON.parse(userRaw);

    if (user.card.balance < amount) {
        throw new Error('not enought money');
    }

    user.card.balance -= amount;
    await redisClient.hsetAsync('users', 'user:' + userId, JSON.stringify(user));
    return user.card.balance;
}

module.exports = {
    createUser,
    deleteUser,
    getBalance,
    isLoginUsed,
    generateUserToken,
    getUserByCredentials,
    increaseBalance,
    decreaseBalance
}