const { resolve } = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = isDevelopment => ({
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: [resolve(__dirname, '../src')],
        use: 'babel-loader'
      },
      {
        test: /\.(css|scss)$/,
        include: [resolve(__dirname, '../src')],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: { sourceMap: isDevelopment }
            },
            {
              loader: 'sass-loader',
              options: { sourceMap: isDevelopment }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: loader => [require('autoprefixer')(), require('cssnano')()]
              }
            }
          ]
        })
      },
      {
        test: /\.(graphql|gql)$/,
        include: [resolve(__dirname, '../src')],
        use: 'graphql-tag/loader'
      }
    ]
  }
});
