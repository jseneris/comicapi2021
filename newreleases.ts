import newReleases from './scraper/new-releases';

export default async function hello() {
  console.log('hello');

  await newReleases(0);
  process.exit(0);
}

hello();
console.log('goodbye');
