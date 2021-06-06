import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
//import cookieSession from 'cookie-session';
//import cookieParser from 'cookie-parser';

import cors from 'cors';
import { NotFoundError } from './errors/not-found-error';
import { errorHandler } from './middlewares/error-handler';
// import { currentUserRouter } from './routes/user/current-user';

// import { catalogQueryRouter } from './routes/catalog/catalog';
// import { signUpRouter } from './routes/user/signup';
// import { signInRouter } from './routes/user/signin';
// import { signOutRouter } from './routes/user/signout';

import { catalogPublisherRouter } from './routes/catalog/publisher';
import { catalogTitleRouter } from './routes/catalog/title';
import { catalogIssueRouter } from './routes/catalog/issue';
// import { catalogSingleIssueRouter } from './routes/catalog/single-issue';

// import { collectionQueryRouter } from './routes/collection/collection';
// import { purchaseQueryRouter } from './routes/collection/purchase';
// import { purchaseItemQueryRouter } from './routes/collection/purchaseitem';
// import { locationQueryRouter } from './routes/collection/location';
// import { boxQueryRouter } from './routes/collection/box';

// import { migrationBoxRouter } from './routes/migration/box';
// import { migrationLocationRouter } from './routes/migration/location';
// import { migrationPurchaseRouter } from './routes/migration/purchase';
// import { migrationPurchaseItemRouter } from './routes/migration/purchaseItem';
// import { migrationScraperRouter } from './routes/migration/scrapper';

// import { scrapeRouter } from './routes/scrape/release';
// import { scrapeTestRouter } from './routes/scrape/log';
// import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';

const app = express();
app.set('trust proxy', true);
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
    exposedHeaders: ['set-cookie'],
  })
);
app.use(json());
// app.use(cookieParser());
// app.use(
//   cookieSession({
//     // name: 'ctest',
//     domain: 'localhost:3000',
//     // sameSite: 'none',
//     // domain: undefined,
//     signed: false,
//     secure: false,
//   })
// );

// app.use(currentUserRouter);

// app.use(catalogQueryRouter);
// app.use(signUpRouter);
// app.use(signInRouter);
// app.use(signOutRouter);

app.use(catalogPublisherRouter);
app.use(catalogTitleRouter);
app.use(catalogIssueRouter);
// app.use(catalogSingleIssueRouter);

// app.use(collectionQueryRouter);
// app.use(purchaseQueryRouter);
// app.use(purchaseItemQueryRouter);
// app.use(locationQueryRouter);
// app.use(boxQueryRouter);

// app.use(migrationBoxRouter);
// app.use(migrationLocationRouter);
// app.use(migrationPurchaseRouter);
// app.use(migrationPurchaseItemRouter);
// app.use(migrationScraperRouter);

// app.use(scrapeRouter);
// app.use(scrapeTestRouter);

app.all('*', async (req, res) => {
  console.log('route not found');
  throw new NotFoundError();
});
app.use(errorHandler);

export { app };
