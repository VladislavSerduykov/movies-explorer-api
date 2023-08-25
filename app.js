const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000, DB_ADDRESS = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

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

app.listen(PORT, () => {
  console.log(`App started on port ${PORT}`);
});
