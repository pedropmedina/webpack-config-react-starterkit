const path = require('path');

const DashboardPlugin = require('webpack-dashboard/plugin');

const settings = require('./webpack.settings');

/**
 * dev server configurations
 */
const configureDevServer = () => ({
  public: settings.devServerConfig.public(),
  contentBase: path.join(__dirname, '..', settings.paths.build.base),
  host: settings.devServerConfig.host(),
  disableHostCheck: true,
  hot: true,
  overlay: true,
  watchContentBase: true,
  watchOptions: {
    poll: !!parseInt(settings.devServerConfig.poll()),
    ignore: /node_modules/
  }
});

/**
 * plugins
 */
const configurePlugins = () => [new DashboardPlugin()];

module.exports = ({ mode }) => ({
  mode,
  devtool: 'inline-sourve-map',
  devServer: configureDevServer(),
  plugins: configurePlugins()
});
