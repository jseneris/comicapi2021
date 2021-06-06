import express, { Request, Response } from 'express';
import { Publisher } from '../../models/Publisher';
import { Title } from '../../models/Title';

const router = express.Router();

router.get('/api/catalog/title', async (req: Request, res: Response) => {
  const titles = await Title.find().populate('publisher').limit(100);

  res.send(titles);
});

export { router as catalogTitleRouter };
