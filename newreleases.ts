import newReleases from './scraper/new-releases';
import { catalogConnection } from './connection';

export default async function hello() {
  console.log('hello');

  await newReleases(0);
}

hello();
console.log('goodbye');
