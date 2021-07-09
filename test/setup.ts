import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';
import request from 'supertest';

// const keys = require('../config/keys.js');

//not really connecting to memory server, only testing read functions
let mongo: any;
beforeAll(async () => {
  mongo = new MongoMemoryServer();
  await mongo.start();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // export const catalogConnection = mongoose.createConnection(keys.catalogURI, {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  //   useCreateIndex: true,
  // });
});

beforeEach(async () => {
  // const collections = await mongoose.connection.db.collections();
  // for (let collection of collections) {
  //   await collection.deleteMany({});
  // }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});
