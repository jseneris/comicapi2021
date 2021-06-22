import { Publisher } from '../models/Publisher';
import { PublisherInterface } from '../interfaces/PublisherInterface';
import { Issue } from '../models/Issue';
import { isConstructorDeclaration } from 'typescript';

const keys = require('../config/keys.js');

export default async function newReleases(dw: number = 0) {
  console.log(keys.catalogURI);

  const test = await Issue.find().limit(10);

  const newPub: PublisherInterface = {
    name: 'test',
    seoFriendlyName: 'seo-test',
  };

  const publisherRec = await new Publisher({
    name: 'test',
  }).save();

  console.log(test);
  console.log(publisherRec);
}
