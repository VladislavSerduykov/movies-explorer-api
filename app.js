require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const helmet = require('helmet');
const cors = require('cors');

const { errors } = require('celebrate');
const defaultConfig = require('./utils/defaultConfig');
const { routes } = require('./routes/routes');
const { errorLogger, requestLogger } = require('./middlewares/logger');
const { limiter } = require('./utils/limiter');
const { errorHandler } = require('./middlewares/errorHandler');

const { PORT = defaultConfig.PORT, DB_ADDRESS = defaultConfig.DATABASE_URL } = process.env;

const app = express();

mongoose
  .connect(DB_ADDRESS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Connected to database on ${DB_ADDRESS}`);
  }).catch((err) => {
    console.log('Error on connect');
    console.log(err);
  });

app.use(cors());
app.use(limiter);
app.use(requestLogger);
app.use(helmet());
app.use(routes);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App started on port ${PORT}`);
});
