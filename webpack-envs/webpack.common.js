const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const settings = require('./webpack.settings');

/**
 * configure entries
 */
const configureEntries = () => {
  let entries = {};
  for (let [key, value] of Object.entries(settings.entries)) {
    entries[key] = path.join(__dirname, '..', settings.paths.src.base + value);
  }
  return entries;
};

/**
 * configure outputs
 */
const configureOutputs = () => ({
  filename: '[name].bundle.js',
  path: path.join(__dirname, '..', settings.paths.build.base)
});

/**
 * configure loaders
 */
const configureBabelLoader = () => ({
  test: /\.(js|jsx)$/,
  exclude: settings.babelLoaderConfig.exclude,
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      presets: [
        [
          '@babel/preset-env',
          {
            modules: false,
            corejs: { version: 2, proposals: true },
            useBuiltIns: 'usage'
          }
        ]
      ]
    }
  }
});

const configureCssLoader = mode => ({
  test: /\.(pcss|css)$/,
  use: [
    {
      loader:
        mode === 'production' ? MiniCssExtractPlugin.loader : 'style-loader'
    },
    {
      loader: 'css-loader',
      options: {
        importLoaders: 2,
        sourceMap: true
      }
    },
    {
      loader: 'resolve-url-loader'
    },
    {
      loader: 'postcss-loader',
      options: {
        sourceMap: true
      }
    }
  ]
});

const configureFontLoader = () => ({
  test: /\.(ttf|eot|woff2)$/,
  use: [
    {
      loader: 'file-loader',
      options: {
        name: 'fonts/[name].[ext]'
      }
    }
  ]
});

const configureImageLoader = () => ({
  test: /\.(png|jpe?g|gif|svg|webp)$/i,
  use: [
    {
      loader: 'file-loader',
      options: {
        name: 'imgs/[name].[hash].[ext]'
      }
    }
  ]
});

/**
 * common plugins for both dev and prod
 */
const configurePlugins = mode => [
  new webpack.ProgressPlugin(),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: path.join(__dirname, '..', settings.paths.templates.html)
  })
];

/**
 * export webpack common configs
 */
module.exports = env => ({
  entry: configureEntries(),
  output: configureOutputs(),
  module: {
    rules: [
      configureBabelLoader(),
      configureCssLoader(env.mode),
      configureImageLoader(),
      configureFontLoader()
    ]
  },
  plugins: configurePlugins()
});
