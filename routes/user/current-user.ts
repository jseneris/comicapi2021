import express from 'express';
import { currentUser } from '../../middlewares/current-user';
import { User, UserDoc } from '../../models/User';

const router = express.Router();

router.get('/api/user/currentuser', currentUser, async (req, res) => {
  console.log('currentUser', req.currentUser);
  const user = await User.findOne({
    auth0Id: req.currentUser?.sub,
  });

  let retval = null;
  if (user) {
    console.log('user', user);
    const { userName, email } = user as UserDoc;
    retval = { userName, email };
  } else {
    console.log('no user');
  }

  res.send({ currentUser: retval });
});

export { router as currentUserRouter };
