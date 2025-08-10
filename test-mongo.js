// test-mongo.js
require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error('Set MONGODB_URI in .env first');
  process.exit(1);
}

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB successfully');
    return mongoose.disconnect();
  })
  .catch(err => {
    console.error('Mongo connection error:', err.message);
    process.exit(1);
  });
