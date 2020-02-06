const merge = require('webpack-merge');

const commonWebpackConfigs = require('./webpack-envs/webpack.common');

const loadWebpackEnvs = env =>
  require(`./webpack-envs/webpack.${env.mode}`)(env);

module.exports = env => merge(commonWebpackConfigs(env), loadWebpackEnvs(env));
