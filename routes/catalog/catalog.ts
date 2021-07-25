import express, { Request, Response } from 'express';
//import { currentUser } from '../../middlewares/current-user';
import { Publisher } from '../../models/Publisher';
import { Issue, IssueDoc } from '../../models/Issue';
import { Title } from '../../models/Title';
import { BadRequestError } from '../../errors/bad-request-error';

const router = express.Router();

router.get('/api/catalog', async (req: Request, res: Response) => {
  const publishers = await Publisher.find();

  res.send(publishers);
});

router.get(
  '/api/catalog/weekly',
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

router.get(
  '/api/catalog/:publisherName',
  async (req: Request, res: Response) => {
    const { publisherName } = req.params;
    const publisher = await Publisher.find({ seoFriendlyName: publisherName });

    const titles = await Title.find({ publisher })
      .populate({
        path: 'firstIssue',
        select: 'seoFriendlyName imageUrl',
      })
      .select('name seoFriendlyName')
      .limit(10);

    res.send(titles);
  }
);

router.get(
  '/api/catalog/:publisherName/:titleName',
  async (req: Request, res: Response) => {
    const { publisherName, titleName } = req.params;
    const publisher = await Publisher.findOne({
      seoFriendlyName: publisherName,
    });

    if (publisher) {
      const title = await Title.findOne({
        publisher,
        seoFriendlyName: titleName,
      });

      if (title) {
        const issues = await Issue.find({ title });

        res.send(issues);
      } else {
        throw new BadRequestError('no title found');
      }
    } else {
      throw new BadRequestError('no publisher found');
    }
  }
);

router.get(
  '/api/catalog/:publisherName/:titleName/:issueNumber',
  async (req: Request, res: Response) => {
    const { publisherName, titleName, issueNumber } = req.params;
    const publisher = await Publisher.findOne({
      seoFriendlyName: publisherName,
    });

    if (publisher) {
      const title = await Title.findOne({
        publisher,
        seoFriendlyName: titleName,
      });

      if (title) {
        const issue = await Issue.find({ title, seoFriendlyName: issueNumber });

        res.send(issue);
      } else {
        throw new BadRequestError('no title found');
      }
    } else {
      throw new BadRequestError('no publisher found');
    }
  }
);

export { router as catalogRouter };
