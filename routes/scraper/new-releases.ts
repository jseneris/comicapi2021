import express, { Request, Response } from 'express';
import { Issue } from '../../models/Issue';
import { Location } from '../../models/Location';
import { Box } from '../../models/Box';
import { PurchaseItem } from '../../models/PurchaseItem';
import mongoose from 'mongoose';
import { User } from '../../models/User';
import { fetchData } from '../../code/fetchdata';
import { IssueInterface } from '../../interfaces/IssueInterface';
import { FetchInterface } from '../../interfaces/FetchInterface';
import { saveIssues } from '../../code/saveIssues';

const keys = require('../../../config/keys.js');

const router = express.Router();

router.get('/api/fetch/newreleases', async (req: Request, res: Response) => {
  let issues: IssueInterface[] = [];
  let { week } = req.query;

  var dw = week ? week : 0;

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
    if (pageIssues.nextUrl.length > 0) {
      issues = issues.concat(pageIssues.issues);
      nextUrl = pageIssues.nextUrl;
      weekOf = pageIssues.weekOf;
      iteration++;
    } else {
      getNext = false;
    }
  } while (getNext);

  await saveIssues(issues);

  res.send(issues);
});

export { router as scrapeRouter };
