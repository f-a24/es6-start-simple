const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  mode: process.env.WEBPACK_SERVE ? 'development' : 'production',
  entry: `${__dirname}/src/js/index.js`,
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
              presets: ['@babel/preset-env']
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
                plugins: [require('autoprefixer')({ grid: true })]
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
  plugins: [new ExtractTextPlugin('style.css')],
  performance: {
    hints: false
  },
  devServer: {
    contentBase: `${__dirname}/public`,
    port: 3000,
    hot: true,
    open: true,
  }
};
