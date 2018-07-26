const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  mode: process.env.WEBPACK_SERVE ? 'development' : 'production',
  entry: ['babel-polyfill', `${__dirname}/src/js/index.js`],
  output: {
    path: `${__dirname}/public`,
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [['env', {'modules': false}]]
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(css|scss)$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                url: false,
                minimize: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: [
                  require('autoprefixer')({grid: true})
                ]
              }
            },
            'sass-loader'
          ]
        })
      }
    ]
  },
  resolve: {
    extensions: ['.js']
  },
  plugins: [ new ExtractTextPlugin('style.css') ],
  performance: {
    hints: false
  },
  serve: {
    content: 'public/',
    open: true,
    port: 3000
  }
};