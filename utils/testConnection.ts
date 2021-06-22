import { Issue } from '../models/Issue';

const keys = require('../config/keys.js');

export default async function newReleases(dw: number = 0) {
  console.log(keys.catalogURI);

  const test = await Issue.find().limit(10);

  console.log(test);
}
