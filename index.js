const express = require('express');
const app = express();
require('dotenv').config();
const config = require('./config');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
 
const redisClient = require('./app/database/connection/redis');

const auth = require('./app/middleware/auth');
const errorHandler = require('./app/middleware/errorHandler');
const kassaRouter = require('./app/routes/kassa');
const loginRouter = require('./app/routes/login');
const weatherRouter = require('./app/routes/weather');

app.use(express.static('public'))
app.use(express.json());
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api', loginRouter);
app.use(auth);
app.use('/api', kassaRouter);
app.use('/api', weatherRouter);
app.use(errorHandler);


app.listen(config.port, () => {
    console.log('server started');
});