//import { Issue } from '../../models/Issue';
//import { Location } from '../../models/Location';
//import { Box } from '../../models/Box';
//import { PurchaseItem } from '../../models/PurchaseItem';
//import { User } from '../../models/User';
//import mongoose from 'mongoose';

import { fetchData } from './fetchdata';
import { IssueInterface } from '../interfaces/IssueInterface';
import { FetchInterface } from '../interfaces/FetchInterface';
import { saveIssues } from './saveIssues';

const keys = require('../config/keys.js');

export default async function newReleases(dw: number = 0) {
  let issues: IssueInterface[] = [];

  let getNext: Boolean = true;
  let nextUrl: string = `${keys.scraperFromUrl}newreleases?dw=${dw}`;

  console.log('nextUrl', nextUrl);

  let weekOf: string = '';
  let iteration: number = 0;

  do {
    let pageIssues: FetchInterface = await fetchData(
      nextUrl,
      weekOf,
      iteration
    );
    issues = issues.concat(pageIssues.issues);
    if (pageIssues.nextUrl.length > 0) {
      nextUrl = pageIssues.nextUrl;
      weekOf = pageIssues.weekOf;
      iteration++;
    } else {
      getNext = false;
    }
  } while (getNext);

  console.log('saving issues');
  await saveIssues(issues);
  console.log('saved');
}
