const redis = require('redis');
const bluebird = require('bluebird');
const config = require('../../../config');

const redisClient = redis.createClient({
    host: config.redisHost,
    port: config.redisPort,
    retry_strategy: () => 1000
});

module.exports = bluebird.promisifyAll(redisClient);