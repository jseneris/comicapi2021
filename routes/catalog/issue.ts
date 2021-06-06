import express, { Request, Response } from 'express';
//import { currentUser } from '../../middlewares/current-user';
import { Publisher } from '../../models/Publisher';
import { Issue, IssueDoc } from '../../models/Issue';

const router = express.Router();

router.get(
  '/api/catalog/issue',
  //  currentUser,
  async (req: Request, res: Response) => {
    let { date, title } = req.query;
    let filter = {};
    if (date) {
      const filterDate = new Date(date.toString());
      const origDate = new Date(date.toString());
      filterDate.setDate(filterDate.getDate() - 7);
      filter = {
        releaseDate: {
          $lte: origDate,
          $gte: filterDate,
        },
      };
    }
    const issues = await Issue.find(filter)
      .populate({
        path: 'title',
        select: 'name seoFriendlyName id publisher',
        //        options: { sort: [['name', 'desc']] },
        populate: {
          path: 'publisher',
          select: 'name seoFriendlyName',
        },
      })
      .select('seoFriendlyName imageUrl');

    const orderedIssues = issues.sort((x, y) => {
      if ((x as IssueDoc).title.name < (y as IssueDoc).title.name) return -1;
      if ((y as IssueDoc).title.name < (x as IssueDoc).title.name) return 1;
      return 0;
    });

    const publishers = await Publisher.find({
      _id: { $in: issues.map((issue) => (issue as IssueDoc).title.publisher) },
    })
      .sort({ displayOrder: 1, name: 1 })
      .select('name imageName seoFriendlyName');
    res.send({
      issues: orderedIssues,
      issueCount: issues.length,
      publishers,
      publisherCount: publishers.length,
    });
  }
);

export { router as catalogIssueRouter };
