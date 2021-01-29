const HtmlWebpackPlugin = require('html-webpack-plugin')
const { resolve } = require('path')

const src = resolve(__dirname, 'src')

module.exports = {
  entry: `${src}/index.js`,
  output: {
    filename: 'dist/bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
    }),
  ],
  mode: 'development',
}
