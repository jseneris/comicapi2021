import express, { Request, Response } from 'express';
import { Publisher } from '../../models/Publisher';
import { Title, TitleDoc } from '../../models/Title';
import { Issue } from '../../models/Issue';
import mongoose from 'mongoose';

const router = express.Router();

router.get('/api/utils/publisher', async (req: Request, res: Response) => {
  const titles = await Title.find({ firstIssue: { $exists: false } }).limit(
    1000
  );

  await titles.map(async (title) => {
    const issues = await Issue.find({ title }).sort({ seoFriendlyName: 1 });
    if (issues.length > 0) {
      (title as TitleDoc).firstIssue = issues[0].id;
    } else {
      (title as TitleDoc).firstIssue = mongoose.Types.ObjectId(
        '123456789012345678901234'
      );
    }
    await title.save();
  });

  res.send(titles);
});

export { router as utilsTitlerRouter };
