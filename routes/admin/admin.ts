import express, { Request, Response } from 'express';
import { currentUser } from '../../middlewares/current-user';
import { Publisher } from '../../models/Publisher';

import { BadRequestError } from '../../errors/bad-request-error';

const router = express.Router();

router.get(
  '/api/admin/publishers',
  currentUser,
  async (req: Request, res: Response) => {
    console.log('user:', req.currentUser);
    const publishers = await Publisher.find().sort({ displayOrder: 1 });

    res.send(publishers);
  }
);

export { router as adminRouter };
