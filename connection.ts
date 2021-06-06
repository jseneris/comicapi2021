import mongoose from 'mongoose';
const keys = require('./config/keys.js');

export const catalogConnection = mongoose.createConnection(keys.catalogURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

export const userConnection = mongoose.createConnection(keys.userURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
