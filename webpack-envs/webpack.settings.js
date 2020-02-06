module.exports = {
  name: 'Webpack config template',
  paths: {
    src: {
      base: '/src/',
      styles: '/src/styles'
    },
    build: {
      base: '/build/',
      clean: ['**/*']
    },
    templates: {
      html: '/public/index.html'
    }
  },
  urls: {
    publicPath: () => process.env.PUBLIC_PATH || '/build/'
  },
  entries: {
    app: 'index.js'
  },
  babelLoaderConfig: {
    exclude: [/(node_modules|bower_components)/]
  },
  devServerConfig: {
    public: () => process.env.DEVSERVER_PUBLIC || 'http://localhost:3000',
    host: () => process.env.DEVSERVER_HOST || 'localhost',
    poll: () => process.env.DEVSERVER_POLL || false,
    port: () => process.env.DEVSERVER_PORT || 3000,
    https: () => process.env.DEVSERVER_HTTPS || false
  },
  purgeCssConfig: {
    paths: ['/src/components/**/*.{js,jsx}', '/src/pages/**/*.{js,jsx}'],
    whitelist: ['../src/styles/**/*.{css}'],
    whitelistPatterns: [],
    extensions: ['html', 'js', 'jsx']
  },
  runtimeCaching: [
    {
      urlPattern: /\.(?:png|jpg|jpeg|svg|webp)$/,
      handler: 'cacheFirst',
      options: {
        cacheName: 'images',
        expiration: {
          maxEntries: 20
        }
      }
    }
  ]
};
