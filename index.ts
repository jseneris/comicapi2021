import mongoose from 'mongoose';
import { app } from './app';
const keys = require('./config/keys.js');

const start = async () => {
  //   try {
  //     await mongoose.connect(keys.mongoURI, {
  //       useNewUrlParser: true,
  //       useUnifiedTopology: true,
  //       useCreateIndex: true,
  //     });
  //     console.log('connected to mongodb');
  //   } catch (err) {
  //     console.log(err);
  //   }
  app.listen(process.env.PORT || 3001, () => {
    console.log('Listening on port 3001!!!');
  });
};

start();
