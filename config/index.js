const config = {
  projectName: 'report-test',
  date: '2018-12-12',
  designWidth: 750,
  deviceRatio: {
    '640': 2.34 / 2,
    '750': 1,
    '828': 1.81 / 2
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: {
    babel: {
      sourceMap: true,
      presets: [
        'env'
      ],
      plugins: [
        'transform-class-properties',
        'transform-decorators-legacy',
        'transform-object-rest-spread'
      ]
    }
  },
  defineConstants: {},
  weapp: {},
  h5: {
    publicPath: '/dist',
    staticDirectory: 'static',
    module: {
      postcss: {
        autoprefixer: {
          enable: true
        }
      }
    },
    devServer: {
      port: 10087,
      host: '192.168.11.164',
      useLocalIp: true,
      open: true,
      openPage: "",
      proxy: {
        "/api/*": {
          "target": "http://home.yuandingbang.cn/mini/",
          "secure": true,
          "pathRewrite": {
            "^/api": ""
          },
          "changeOrigin": true
        }
      }
    }
  },
};

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
