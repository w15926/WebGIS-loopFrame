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
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
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
        target: 'xxx',
        changeOrigin: true,
        pathRewrite: {
          '/apis': ''
        }
      },
      '/api': {
        target: 'http://192.168.3.222:9000',
        changeOrigin: true,
        pathRewrite: {
          '/api': ''
        }
      }
    }
  }
})
