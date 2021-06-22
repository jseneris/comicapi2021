const keys = require('../config/keys.js');

import { IssueInterface } from '../interfaces/IssueInterface';

import { Publisher, PublisherDoc } from '../models/Publisher';
import { Title, TitleDoc } from '../models/Title';
import { Issue } from '../models/Issue';

export const saveIssues = async (issues: IssueInterface[]) => {
  console.log('here');
  issues.sort((a: IssueInterface, b: IssueInterface) => {
    if (a.publisherValue === b.publisherValue) {
      if (a.titleValue === b.titleValue) {
        return a.issueNumberValue > b.issueNumberValue ? 1 : -1;
      } else {
        return a.titleValue > b.titleValue ? 1 : -1;
      }
    } else {
      return a.publisherValue > b.publisherValue ? 1 : -1;
    }
  });

  console.log('here2');

  // var lastPub: PublisherDoc | null = null;
  var lastPub: any | null = null;
  // var lastTitle: TitleDoc | null = null;
  var lastTitle: any | null = null;
  // let publisherRec: PublisherDoc | null = null;
  let publisherRec: any | null = null;
  // let titleRec: TitleDoc | null = null;
  let titleRec: any | null = null;

  for (var x = 0; x < issues.length; x++) {
    const issue = issues[x];

    if (!lastPub || issue.publisherValue !== lastPub.name) {
      try {
        publisherRec = await Publisher.findOne({
          name: issue.publisherValue,
        });
        if (!publisherRec) {
          publisherRec = await new Publisher({
            name: issue.publisherValue,
          }).save();
        }
        lastPub = publisherRec;
        console.log('saved pub');
      } catch (err) {
        console.log(err);
      }
    }

    if (!lastTitle || issue.titleValue !== lastTitle.name) {
      try {
        titleRec = await Title.findOne({
          name: issue.titleValue,
        });
        if (!titleRec) {
          titleRec = await new Title({
            name: issue.titleValue,
            publisher: publisherRec!.id,
            loneStarId: issue.titleIdValue,
          }).save();
        } else {
          if (!titleRec.loneStarId && issue.titleIdValue) {
            titleRec.set('loneStarId', issue.titleIdValue);
            await titleRec.save();
          }
        }
        lastTitle = titleRec;
        console.log('saved title');
      } catch (err) {
        console.log(err);
      }
    }

    try {
      let issueRec = await Issue.findOne({
        issueNumber: issue.issueNumberValue,
        title: titleRec!,
      });
      if (!issueRec) {
        issueRec = await new Issue({
          issueNumber: issue.issueNumberValue,
          description: issue.descriptionValue,
          coverPrice: issue.priceValue,
          releaseDate: Date.parse(issue.pubDateValue),
          imageUrl: issue.imageUrlValue,
          title: titleRec!.id,
          createdDate: new Date(Date.now()),
        }).save();
      } else {
        issueRec.set({
          description: issue.descriptionValue,
          coverPrice: issue.priceValue,
          releaseDate: Date.parse(issue.pubDateValue),
          imageUrl: issue.imageUrlValue,
        });
        await issueRec.save();
      }
      console.log('saved issue');
    } catch (err) {
      console.log(err);
    }
  }
};
