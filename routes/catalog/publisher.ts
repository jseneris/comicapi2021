import express, { Request, Response } from 'express';
import { Publisher } from '../../models/Publisher';

const router = express.Router();

router.get('/api/catalog/publisher', async (req: Request, res: Response) => {
  const publishers = await Publisher.find().limit(10);

  res.send(publishers);
});

export { router as catalogPublisherRouter };
