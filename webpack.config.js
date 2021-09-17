const path = require('path');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

module.exports = {
  entry: { bundle: ['./src/scripts/theme.js', './src/styles/theme.scss'] },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'src/assets'), // outputs bundled .js and .scss.liquid into shopify's assets folder
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
        test: /\.svg$/, // your icons directory
        loader: 'svg-sprite-loader',
        include: path.resolve( __dirname, "./src/styles/icons"),
        options: {
          extract: true,
          spriteFilename: 'icons.svg', // this is the destination of your sprite sheet
          symbolId: "[name]"
        }
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        include: path.resolve( __dirname, "./src/styles/fonts"),
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
      filename: "main.scss.liquid"
    }),
    new SpriteLoaderPlugin({
      plainSprite: true 
    }),
    new FileManagerPlugin({
      events: {
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
      }
    })
  ],
  resolve: {
    extensions: ['.scss', '.js', '.liquid']
  }
};