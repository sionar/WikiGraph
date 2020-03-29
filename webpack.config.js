const path = require('path');
module.exports = {
  context: __dirname,
  entry: './src/index.js', // specifies where webpack will start looking
  output: {
    path: path.resolve(__dirname),
    filename: './bundle.js'
  },
  resolve: {
    extensions: ['.js', '*']
  },
  devtool: 'source-map',
};