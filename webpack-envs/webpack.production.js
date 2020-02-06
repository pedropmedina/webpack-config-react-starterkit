const whitelister = require('purgecss-whitelister');
const glob = require('glob-all');
const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PurgeCssPlugin = require('purgecss-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BundleAnalyzerWebpackPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

const settings = require('./webpack.settings');

// https://github.com/FullHuman/purgecss#extractor
class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-Za-z0-9-_:\/]+/g) || [];
  }
}

const configurePurgeCss = () => {
  let paths = [];

  for (let dir of settings.purgeCssConfig.paths) {
    paths.push(path.join(__dirname, '..', dir));
  }

  return {
    paths: glob.sync(paths),
    whitelist: whitelister(settings.purgeCssConfig.whitelist),
    whitelistPatterns: settings.purgeCssConfig.whitelistPatterns,
    extractors: [
      {
        extractor: TailwindExtractor,
        extensions: settings.purgeCssConfig.extensions
      }
    ]
  };
};

/**
 * plugins
 */
const configurePlugins = () => [
  new CleanWebpackPlugin(),
  new BundleAnalyzerWebpackPlugin(),
  new MiniCssExtractPlugin({
    filename: '[name].[hash].css',
    chunkFilename: '[id].[hash].css'
  }),
  new PurgeCssPlugin(configurePurgeCss())
];

module.exports = ({ mode }) => ({
  mode,
  devtool: 'source-map',
  plugins: configurePlugins()
});
