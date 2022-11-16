/**
 * @description webpack默认配置
 * @author 王乐翔
 * @createDate 2022/10/23
 * @lastEditDate
 * @lastEditAuthor
 * @returns
 */

const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    host: 'localhost',
    // port,
    open: false,
    proxy: {
      '/apis': {
        target: 'http://58.59.29.51:11014',
        changeOrigin: true,
        pathRewrite: {
          '/apis': ''
        }
      },
      '/api': {
        target: 'http://192.168.3.222:9000',
        // target: 'https://www.hainanqx.cn',
        // target: 'http://10.76.30.58', // 黄岛内网
        // target: 'http://58.59.29.51:11014', // 黄岛外网
        changeOrigin: true,
        pathRewrite: {
          '/api': ''
        }
      }
    }
  }
})
