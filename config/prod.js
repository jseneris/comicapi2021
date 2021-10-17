//prod.js
module.exports = {
  userURI: process.env.USERDB_URI,
  catalogURI: process.env.CATALOGDB_URI,
  scraperFromUrl: process.env.SCRAPER_URI,
  jwtKey: process.env.JWTKEY,
};
