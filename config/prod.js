//prod.js
module.exports = {
  azureCdnAddress: process.env.CDN_URI,
  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  mongoURI: process.env.MONGO_URI,
  cookieKey: process.env.COOKIE_KEY,
  scraperFromUrl: process.env.SCRAPER_URI,
  jwtKey: process.env.JWT_KEY,
};
