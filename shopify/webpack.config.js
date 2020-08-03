const path = require('path');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  entry: './src/scripts/theme.js',
  output: {
    path: path.resolve(__dirname, 'src/assets'), // outputs bundled .js and .scss.liquid into shopify's assets folder
    filename: 'main.js',
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorPluginOptions: {
          preset: ['default', { discardComments: { removeAll: true } }],
        }
      })
    ]
  },
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
            {
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      path: path.resolve(__dirname, 'src/assets'),
      filename: "main.scss.liquid"
    }),
    new UglifyJSPlugin(),
    new FileManagerPlugin({
      onStart: {
        delete: ['dist/**/*'], // clean dist
      },
      onEnd: {
        mkdir: ['dist'],
        copy: [
          { source: 'src/assets', destination: 'dist/assets' },
          { source: 'src/config', destination: 'dist/config' },
          { source: 'src/layout', destination: 'dist/layout' },
          { source: 'src/locales', destination: 'dist/locales' },
          { source: 'src/sections', destination: 'dist/sections' },
          { source: 'src/snippets', destination: 'dist/snippets' },
          { source: 'src/templates', destination: 'dist/templates' }
        ],
      }
    })
  ],
  resolve: {
    extensions: ['.css', '.scss', '.js', '.liquid']
  }
};