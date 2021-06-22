// import { Issue } from './models/Issue';
// import { LocalTitle } from './models/LocalTitle';
//import { Publisher } from './models/Publisher';
// import { Title } from './models/Title';
import newReleases from './scraper/new-releases';
import { catalogConnection } from './connection';

export default async function hello() {
  console.log('hello');
  // const issues = await Issue.find().limit(10);

  // console.log(issues);

  // const publishers = await Publisher.find().limit(10);

  // console.log(publishers);

  // const publisherRec = await Publisher.findOne({
  //   name: 'Marvel',
  // });

  // console.log(publisherRec);
  // const titles = await Title.find().limit(10);

  // console.log(titles);

  // const localTitles = await LocalTitle.find().limit(10);

  // console.log(localTitles);

  await newReleases(49);
  // console.log('finished');
  // catalogConnection.close();
  // console.log('finished2');
  process.exit(0);
  return;
}

hello();
console.log('goodbye');
