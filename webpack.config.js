const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');

// Plugins
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');

// Config
require('dotenv').config();

function genPath(filePath) { return path.resolve(__dirname, filePath); }

const isProduction = process.env.NODE_ENV === 'production';

process.env.NODE_PATH = genPath('src');

// Basic configuration

let config = {
  entry: ['react-hot-loader/patch', genPath('src/index.js')],
  output: {
    path: genPath('dist'),
    filename: 'js/[hash].js',
    publicPath: '/',
    chunkFilename: '[chunkhash].js',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: 'css-loader',
          fallback: 'style-loader'
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1
              }
            },
            {
              loader: 'postcss-loader'
            },
            {
              loader: 'sass-loader'
            }
          ],
          fallback: 'style-loader'
        })
      },
      {
        test: /\.(svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'raw-loader',
      },
      {
        test: /\.(png|gif|jpe?g)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          'image-webpack-loader',
          {
            loader: 'file-loader',
            options: {
              name: '[hash].[ext]',
              outputPath: 'images/',
              verbose: false
            }
          }
        ]
      },
      {
        test: /\.(eot|tiff|woff2|woff|ttf|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[hash].[ext]',
              outputPath: 'fonts/',
              verbose: false
            }
          }
        ]
      }
    ]
  },
  resolve: {
    alias: { '@': genPath('src') },
    extensions: ['.js', '.jsx', '.scss', '.css'],
    modules: [genPath('node_modules')]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.COLLECTION': `"${process.env.COLLECTION}"`,
      'process.env.API_KEY': `"${process.env.API_KEY}"`,
      'process.env.TITLE': `"${process.env.TITLE}"`
    }),
    new ExtractTextPlugin({
      filename: 'css/[chunkhash].css',
      allChunks: true,
      disable: !isProduction
    }),
    new HtmlWebpackPlugin({
      template: genPath('src/templates/index.html'),
      favicon: genPath('src/assets/favicon.ico'),
      minify: {
        minifyJS: true,
        minifyCSS: true,
        quoteCharacter: '"'
      }
    }),
    new InterpolateHtmlPlugin({
      TITLE: process.env.TITLE,
      PROD: isProduction
    })
  ]
};

let stats = {
  modules: false,
  children: false,
  chunks: false
};

let devServer = {
  watchContentBase: true,
  port: 3000,
  stats,
  publicPath: '/',
  historyApiFallback: true,
  hot: true,
  contentBase: genPath('src/template')
};

// Development configuration

let development = {
  module: {
    rules: []
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
};

// Production configuration

let production = {
  module: {
    rules: []
  },
  plugins: [
    new CleanWebpackPlugin([genPath('dist/*')], { verbose: false }),
    new webpack.optimize.CommonsChunkPlugin({
      minChunks: 2,
      children: true
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new UglifyjsWebpackPlugin({
      sourceMap: true
    })
  ]
};

if (process.env.NODE_ENV !== 'production') {
  // Development mode
  config = merge(merge(config, { devServer }), development);
} else {
  // Production mode
  config = merge(merge(config, { stats }), production);
}

module.exports = config;
