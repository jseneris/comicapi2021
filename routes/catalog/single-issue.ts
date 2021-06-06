// import express, { Request, Response } from 'express';
// import { Title } from '../../models/Title';
// import { Issue } from '../../models/Issue';
// import { Publisher } from '../../models/Publisher';
// import { currentUser } from '../../middlewares/current-user';
// import { User } from '../../models/User';
// import { PurchaseItem } from '../../models/PurchaseItem';

// const router = express.Router();

// router.get(
//   '/api/catalog/:publisher/:title/:issue',
//   currentUser,
//   async (req: Request, res: Response) => {
//     const { publisher, title, issue } = req.params;

//     const foundPublisher = await Publisher.findOne({
//       seoFriendlyName: publisher,
//     });

//     if (foundPublisher) {
//       const foundTitle = await Title.findOne({
//         seoFriendlyName: title,
//         publisher: foundPublisher,
//       });

//       if (foundTitle) {
//         const foundIssue = await Issue.findOne({
//           title: foundTitle,
//           seoFriendlyName: issue,
//         }).populate({
//           path: 'title',
//           select: 'name seoFriendlyName id publisher',
//           populate: {
//             path: 'publisher',
//             select: 'name seoFriendlyName',
//           },
//         });

//         const titleIssues = await Issue.find({
//           title: foundTitle,
//         }).select('seoFriendlyName imageUrl');

//         let purchaseItems = null;
//         if (req.currentUser && req.currentUser.id) {
//           const user = await User.findById(req.currentUser.id);
//           if (user && foundIssue) {
//             purchaseItems = await PurchaseItem.find({
//               user,
//               issue: foundIssue,
//             }).populate({
//               path: 'box purchase',
//             });
//           }
//         }

//         res.send({
//           issue: foundIssue,
//           titleList: titleIssues,
//           ownIssue: purchaseItems,
//         });
//       }
//     }

//     res.send();
//   }
// );

// export { router as catalogSingleIssueRouter };
