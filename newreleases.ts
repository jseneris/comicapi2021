import newReleases from './scraper/new-releases';

export default async function hello() {
  console.log('hello');

  try {
    await newReleases(0);
  } catch (error) {
    console.log(error);
  }

  process.exit(0);
}

hello();
console.log('goodbye');
