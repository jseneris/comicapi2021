import express, { Request, Response } from 'express';
import { Publisher } from '../../models/Publisher';
import { Title } from '../../models/Title';

const router = express.Router();

router.get('/api/catalog/publisher', async (req: Request, res: Response) => {
  const publishers = await Publisher.find();

  res.send(publishers);
});

router.get(
  '/api/catalog/publisher/:publisherName',
  async (req: Request, res: Response) => {
    const { publisherName } = req.params;
    const publisher = await Publisher.find({ seoFriendlyName: publisherName });

    const titles = await Title.find({ publisher })
      .populate({
        path: 'firstIssue',
        select: 'seoFriendlyName imageUrl',
      })
      .select('name ')
      .limit(10);

    console.log('api', titles);

    res.send(titles);
  }
);

export { router as catalogPublisherRouter };
