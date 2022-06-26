const path = require('path');

/*module.exports = {
  // The entry point file described above
  entry: './src/js/script.js',
  // The location of the build folder described above
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },
  // Optional and for development only. This provides the ability to
  // map the built code back to the original source format when debugging.
  devtool: 'eval-source-map',
};*/

module.exports = {
    entry: {
      landing: './src/js/landing.js',
      login: './src/js/login.js',
      adm: './src/js/admin.js'
    },

    output: {
      path: path.join(__dirname, 'public'),
      filename: 'js/[name]-bundle.js', // Hacky way to force webpack   to have multiple output folders vs multiple files per one path
    },
      // Optional and for development only. This provides the ability to
  // map the built code back to the original source format when debugging.
  devtool: 'eval-source-map',
};