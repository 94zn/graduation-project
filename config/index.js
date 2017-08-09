// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 8080,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/api': {
          target: 'http://localhost:8088/',
          changeOrigin: true,
          pathRewrite: {
            '^/api': ''
          }
        },
        '/adminOrderList': {
          target: 'http://localhost:8088/',
          changeOrigin:true,
          },
        '/allProducts':{
          target:'http:localhost:8088/',
          changeOrigin:true
        },
        '/buy':{
          target:'http:localhost:8088/',
          changeOrigin:true
        },
        '/userList':{
          target : 'http:localhost:8088/',
          changeOrigin:true
        },
        '/modify':{
          target : 'http:localhost:8088/',
          changeOrigin:true
        },
        '/addCar':{
          target : 'http:localhost:8088/',
          changeOrigin:true
        },
        '/userProduct':{
          target : 'http:localhost:8088/',
          changeOrigin:true
        },
        '/type':{
          target : 'http:localhost:8088/',
          changeOrigin:true
        },
        '/deleteProduct':{
          target : 'http:localhost:8088/',
          changeOrigin:true
        },
        '/search':{
          target : 'http:localhost:8088/',
          changeOrigin:true
        },
        '/userOrders':{
          target : 'http:localhost:8088/',
          changeOrigin:true
        },
        '/adminChangeStatus':{
          target : 'http:localhost:8088/',
          changeOrigin:true
        },
        '/deleteCar':{
          target : 'http:localhost:8088/',
          changeOrigin:true
        },
        '/getProductByOrderId':{
          target : 'http:localhost:8088/',
          changeOrigin:true
        },
        '/addContent':{
          target : 'http:localhost:8088/',
          changeOrigin:true
        }
    }
      ,
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
