//keys.js - what set of credentials
if (process.env.NODE_ENV === 'production') {
  //return prod keys
  module.exports = require('./prod');
} else {
  //dev keys
  module.exports = require('./dev');
}
