const { defineConfig } = require('@vue/cli-service')
const path = require('path')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '.',
  // productionSourceMap: false,
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@assets': path.resolve(__dirname, 'src/assets'),
        '@store': path.resolve(__dirname, 'src/store'),
        '@utils': path.resolve(__dirname, 'src/utils'),
        '@model': path.resolve(__dirname, 'src/model'),
      }
    }
  },
  devServer: {
    client: {
      overlay: false, // ✅ 关闭错误遮罩
    },
  },
  pages: {
    pendant: {
      entry: 'src/page/pendant/main.js',
      template: 'public/page/pendant/pendant.html',
      filename: 'page/pendant/pendant.html',
      publicPath: '../../',
    },
    home: {
      entry: 'src/page/home/main.js',
      template: 'public/page/home/home.html',
      filename: 'page/home/home.html',
      publicPath: '../../',
    },
    relax: {
      entry: 'src/page/relax/main.js',
      template: 'public/page/relax/relax.html',
      filename: 'page/relax/relax.html',
      publicPath: '../../',
    }
  }
})
